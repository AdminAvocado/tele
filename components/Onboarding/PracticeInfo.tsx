"use client";
import { BioDataFormProps, PracticeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";

import RadioInput from "../FormInputs/RadioInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function PracticeInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { practiceData, savedDBData, setPracticeData } = useOnboardingContext();
  const pathname = usePathname();
  const insuranceOptions = [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ];
  const initialServices =
    doctorProfile.servicesOffered.length > 0
      ? doctorProfile.servicesOffered
      : savedDBData.servicesOffered;
  const initialInsuranceStatus =
    doctorProfile.insuranceAccepted || savedDBData.insuranceAccepted;
  const [services, setServices] = useState(initialServices);
  // console.log(services, initialServices);
  const [insuranceAccepted, setInsuranceAccepted] = useState(
    initialInsuranceStatus
  );
  // console.log(date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PracticeFormProps>({
    defaultValues: {
      hospitalName: doctorProfile.hospitalName || savedDBData.hospitalName,
      hospitalAddress:
        doctorProfile.hospitalAddress || savedDBData.hospitalAddress,
      hospitalContactNumber:
        doctorProfile.hospitalContactNumber ||
        savedDBData.hospitalContactNumber,
      hospitalEmailAddress:
        doctorProfile.hospitalEmailAddress || savedDBData.hospitalEmailAddress,
      hospitalWebsite:
        doctorProfile.hospitalWebsite || savedDBData.hospitalWebsite,
      hospitalHoursOfOperation:
        doctorProfile.hospitalHoursOfOperation ||
        savedDBData.hospitalHoursOfOperation,
      insuranceAccepted:
        doctorProfile.insuranceAccepted || savedDBData.insuranceAccepted,
      page: doctorProfile.page || savedDBData.page,
      hourlyWage: doctorProfile.hourlyWage || savedDBData.hourlyWage,
    },
  });
  const router = useRouter();
  async function onSubmit(data: PracticeFormProps) {
    data.page = page;
    data.insuranceAccepted = insuranceAccepted;
    data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation);
    data.servicesOffered = services;
    data.hourlyWage = Number(data.hourlyWage);
    console.log(userId, formId);
    console.log(data);
    setIsLoading(true);
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        //extract the profile form data from the updated profile
        toast.success("Información de la práctica actualizada exitosamente");
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
  // hospitalName: string;
  // hospitalAddress: string;
  // hospitalContactNumber: string;
  // hospitalEmailAddress: string;
  // hospitalWebsite?: string;
  // hospitalHoursOfOperation: number;
  // servicesOffered: string[];
  // insuranceAccepted: string;
  // languagesSpoken: string[];
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
            label="Nombre del Hospital"
            register={register}
            name="hospitalName"
            errors={errors}
            placeholder="Ingrese el nombre del hospital "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Cobro por hora"
            register={register}
            name="hourlyWage"
            type="number"
            errors={errors}
            placeholder="Ingrese el cobro por hora "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Dirección del Hospital"
            register={register}
            name="hospitalAddress"
            errors={errors}
            placeholder="Ingrese la dirección del hospital "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Número de Contacto del Hospital"
            register={register}
            name="hospitalContactNumber"
            errors={errors}
            placeholder="Ingrese el número de contacto del hospital"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Correo Electrónico del Hospital"
            register={register}
            name="hospitalEmailAddress"
            errors={errors}
            placeholder="Ingrese el correo electrónico del hospital"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Hospital Website (Optional)"
            register={register}
            name="hospitalWebsite"
            errors={errors}
            placeholder="Ingrese el sitio web del hospital"
            className="col-span-full sm:col-span-1"
            isRequired={false}
          />
          <TextInput
            label="Horario de Operación del Hospital"
            register={register}
            name="hospitalHoursOfOperation"
            errors={errors}
            type="number"
            placeholder="Ingrese el horario de operación del hospital ej: 5"
            className="col-span-full sm:col-span-1"
          />

          <ShadSelectInput
            label="¿Acepta Seguro?"
            optionTitle="Seguro Aceptado"
            options={insuranceOptions}
            selectedOption={insuranceAccepted}
            setSelectedOption={setInsuranceAccepted}
          />
          <ArrayItemsInput
            setItems={setServices}
            items={services}
            itemTitle="Agregar Servicios del Hospital"
          />
          {/* <ArrayItemsInput
            setItems={setLanguages}
            items={languages}
            itemTitle="Agregar Idiomas Hablados en el Hospital"
          /> */}
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
