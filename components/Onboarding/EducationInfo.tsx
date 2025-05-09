"use client";
import { BioDataFormProps, EducationFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";

import RadioInput from "../FormInputs/RadioInput";
import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import MultipleFileUpload, {
  FileProps,
} from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function EducationInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  specialties,
  doctorProfile,
}: StepFormProps) {
  const { educationData, savedDBData, setEducationData } =
    useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const allSpecialties =
    specialties?.map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    }) || [];

  const initialSpecialities =
    doctorProfile.otherSpecialties.length > 0
      ? doctorProfile.otherSpecialties
      : savedDBData.otherSpecialties;
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities);
  const initialDocs = doctorProfile.boardCertificates.map((item) => {
    return {
      title: item,
      size: 0,
      url: item,
    };
  });
  const [docs, setDocs] = useState<FileProps[]>(initialDocs);

  console.log(docs);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormProps>({
    defaultValues: {
      medicalSchool: doctorProfile.medicalSchool || savedDBData.medicalSchool,
      graduationYear:
        doctorProfile.graduationYear || savedDBData.graduationYear,
      primarySpecialization:
        doctorProfile.primarySpecialization ||
        savedDBData.primarySpecialization,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: EducationFormProps) {
    data.page = page;
    data.otherSpecialties = otherSpecialties;
    data.boardCertificates = docs.map((doc: any) => doc.url);
    console.log(data);
    setIsLoading(true);
    //   medicalSchool: string;
    // graduationYear: number;
    // primarySpecialization: string;
    // otherSpecialties: string[];
    // boardCertificates: string[];
    // page: string;
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setEducationData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Información Académica Actualizada Exitosamente");
        //extract the profile form data from the updated profile
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Escuela de Medicina"
            register={register}
            name="medicalSchool"
            errors={errors}
            placeholder="Ingrese el nombre de su escuela de medicina"
          />
          <TextInput
            label="Año de Graduación"
            register={register}
            type="number"
            name="graduationYear"
            errors={errors}
            placeholder="Ingrese el año de graduación"
            className="col-span-full sm:col-span-1"
          />
          <SelectInput
            options={allSpecialties}
            label="Selecciona tu Especialidad Primaria"
            name="primarySpecialization"
            className="col-span-full sm:col-span-1"
            register={register}
          />
          <ArrayItemsInput
            setItems={setOtherSpecialties}
            items={otherSpecialties}
            itemTitle="Agrega otras Especialidades"
          />
          <MultipleFileUpload
            label="Sube tus Documentos Académicos (Máx de 4 docs)"
            files={docs as any}
            setFiles={setDocs}
            endpoint="doctorProfessionDocs"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Guardar y Continuar"
            isLoading={isLoading}
            loadingTitle="Guardando, por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
