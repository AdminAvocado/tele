import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getNormalDate } from "@/utils/getNormalDate";
import { timeAgo } from "@/utils/timeAgo";
import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
} from "lucide-react";
import SubHeading from "./SubHeading";
import { DoctorProfile } from "@prisma/client";
import { FaRegFilePdf } from "react-icons/fa";
import Link from "next/link";
export default function FrontDoctorDetails({
  doctorProfile,
}: {
  doctorProfile: DoctorProfile | null | undefined;
}) {
  if (!doctorProfile) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="space-y-3 text-center flex items-center justify-center flex-col">
          <AlertTriangle className="w-10 h-10 " />
          <h2>No Doctor Profile Found</h2>
        </div>
      </div>
    );
  }
  const dob = doctorProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  return (
    <div className="p-4">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Información del Doctor</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="practice">Prácticas</TabsTrigger>
          <TabsTrigger value="additional">Información Adicional</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-4">
            <SubHeading title="General" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Nombre:</span>
                <span>{doctorProfile?.firstName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Apellido(s):</span>
                <span>{doctorProfile?.lastName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Fecha de Nacimiento:</span>
                <span>{getNormalDate(dob as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Segundo Nombre:</span>
                <span>{doctorProfile?.middleName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Género:</span>
                <span>{doctorProfile?.gender}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Información del Perfil" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Licencia Médica:</span>
                <span>{doctorProfile?.medicalLicense}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Años de Experiencia:</span>
                <span>{doctorProfile?.yearsOfExperience}</span>
              </div>
            </div>
            <div className="py-3 space-y-3">
              <p>{doctorProfile?.bio}</p>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Información de Contacto" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Correo:</span>
                <span>{doctorProfile?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Teléfono:</span>
                <span>{doctorProfile?.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">País:</span>
                <span>{doctorProfile?.country}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Ciudad:</span>
                <span>{doctorProfile?.city}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Estado:</span>
                <span>{doctorProfile?.state}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="p-4">
            <SubHeading title="Historial de Educación" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Graduación:</span>
                <span>{doctorProfile?.graduationYear}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Especialización:</span>
                <span>{doctorProfile?.primarySpecialization}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Escuela de Medicina:</span>
                <span>{doctorProfile?.medicalSchool}</span>
              </div>
              {doctorProfile?.otherSpecialties && (
                <div className="">
                  <h2>Especialidades Adicionales</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.otherSpecialties.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="practice">
          <div className="p-4">
            <SubHeading title="Prácticas" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Nombre del Hospital:</span>
                <span>{doctorProfile?.hospitalName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Costo por consulta:</span>
                <span>{doctorProfile?.hourlyWage}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Dirección del Hospital:</span>
                <span>{doctorProfile?.hospitalAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Contacto del Hospital:</span>
                <span>{doctorProfile?.hospitalContactNumber}</span>
              </div>

              <div className="flex items-center">
                <span className="mr-3">Horario de operación del Hospital:</span>
                <span>{doctorProfile?.hospitalHoursOfOperation}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">¿Acepta Seguro?:</span>
                <span>{doctorProfile?.insuranceAccepted}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Correo del Hospital:</span>
                <span>{doctorProfile?.hospitalEmailAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Sitio web del Hospital:</span>
                <span>{doctorProfile?.hospitalWebsite}</span>
              </div>

              {doctorProfile?.servicesOffered && (
                <div className="">
                  <h2>Servicios del Hospital</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.servicesOffered.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="additional">
          <div className="p-4">
            <SubHeading title="Información Adicional" />

            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Historial de Educación :</span>
                <span>{doctorProfile?.educationHistory}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Trabajo Publicado o Investigación :</span>
                <span>{doctorProfile?.research}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Logros o Premios :</span>
                <span>{doctorProfile?.accomplishments}</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
