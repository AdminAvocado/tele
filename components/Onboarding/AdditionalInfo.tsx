"use client";
import { additionalFormProps } from "@/types/types";

import { useForm } from "react-hook-form";

import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { TextAreaInput } from "../FormInputs/TextAreaInput";

import { StepFormProps } from "./BioDataForm";
import MultipleFileUpload, {
  FileProps,
} from "../FormInputs/MultipleFileUpload";
import { completeProfile, updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";
import path from "path";

export default function AdditionalInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const { additionalData, savedDBData, setAdditionalData } =
    useOnboardingContext();
  const pathname = usePathname();
  const initialDocs = doctorProfile.additionalDocs.map((item) => {
    return {
      title: item,
      size: 0,
      url: item,
    };
  });
  const isOnboarding = pathname.split("/").includes("onboarding");
  const [isLoading, setIsLoading] = useState(false);
  const [additionalDocs, setAdditionalDocs] =
    useState<FileProps[]>(initialDocs);
  console.log(formId);
  // console.log(date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<additionalFormProps>({
    defaultValues: {
      educationHistory:
        doctorProfile.educationHistory || savedDBData.educationHistory,
      research: doctorProfile.research || savedDBData.research,
      accomplishments:
        doctorProfile.accomplishments || savedDBData.accomplishments,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: additionalFormProps) {
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url);
    console.log(data);

    setIsLoading(true);
    try {
      if (isOnboarding) {
        const res = await completeProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);

          //extract the profile form data from the updated profile
          // SEND A WELCOME EMAIL

          toast.success("Perfil Completado Exitosamente");

          //ROUTE THEM TO THE LOGIN
          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      } else {
        const res = await updateDoctorProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);

          //extract the profile form data from the updated profile
          // SEND A WELCOME EMAIL

          toast.success("Perfil Completado Exitosamente");

          //ROUTE THEM TO THE LOGIN
          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 dark:border-slate-600 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextAreaInput
            label="Historial Académico"
            register={register}
            name="educationHistory"
            errors={errors}
            placeholder="Ingrese su Historial Académico"
          />
          <TextAreaInput
            label="Trabajo Publicado o Investigación"
            register={register}
            name="research"
            errors={errors}
            placeholder="Ingrese cualquier Trabajo Publicado o Investigación"
          />
          <TextAreaInput
            label="Logros Especiales o Premios"
            register={register}
            name="accomplishments"
            errors={errors}
            placeholder="Ingrese cualquier Logro Especiales o Premios"
          />
          <MultipleFileUpload
            label="Documentos Adicionales (CV, Certificaciones Médicas, etc.)"
            files={additionalDocs as any}
            setFiles={setAdditionalDocs}
            endpoint="additionalDocs"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title={isOnboarding ? "Completar" : "Guardar"}
            isLoading={isLoading}
            loadingTitle="Guardando, por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
