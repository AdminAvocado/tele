"use client";
import { type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SignupCarousel from "../Frontend/SignupCarousel";
import Logo from "../Frontend/Logo";

export default function RegisterWithBg({
  role = "USER",
  plan = "",
}: {
  role?: string | string[] | undefined;
  plan?: string | string[] | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();
  async function onSubmit(data: RegisterInputProps) {
    // console.log(data);
    setIsLoading(true);
    data.role = role;
    data.plan = plan;
    try {
      const user = await createUser(data);
      if (user.status === 409) {
        setIsLoading(false);
        setEmailErr(user.error);
      } else if (user.status === 200) {
        setIsLoading(false);
        reset();
        toast.success("Account Created successfully");
        router.push(`/verify-account/${user.data?.id}`);
        console.log(user.data);
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="absolute top-5 left-5">
            <Logo />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Crear una Cuenta</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Nombre Completo"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="Ej. Juan Perez"
            />
            <TextInput
              label="Correo Electrónico"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Ej. juanperez@gmail.com"
            />
            {emailErr && (
              <p className="text-red-500 text-xs mt-2">{emailErr}</p>
            )}
            <TextInput
              label="Número de Teléfono"
              register={register}
              name="phone"
              type="tel"
              errors={errors}
              placeholder="Ej. +52 5512345678"
            />
            <TextInput
              label="Contraseña"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />

            <SubmitButton
              title="Registrarse"
              isLoading={isLoading}
              loadingTitle="Registrando Cuenta, por favor espera..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <SignupCarousel />
        {/* <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Woman using tablet"
          layout="fill"
          objectFit="cover"
          className="filter brightness-50"
        /> */}
      </div>
    </div>
  );
}
