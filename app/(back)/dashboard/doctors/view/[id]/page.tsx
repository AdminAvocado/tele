import {
  getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
import { getDoctorById, getDoctorProfile } from "@/actions/users";
import { FaRegFilePdf } from "react-icons/fa";
import ApproveBtn from "@/components/Dashboard/ApproveBtn";
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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubHeading from "@/components/SubHeading";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointments = (await getDoctorAppointments(id)).data || [];
  const doctor = await getDoctorById(id);
  const doctorProfile = await getDoctorProfile(id);
  const status = doctorProfile?.status ?? "PENDING";
  const dob = doctorProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  const expiry =
    doctorProfile?.medicalLicenseExpiry ?? "1992-05-13T21:00:00.000Z";
  // console.log(dob);
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
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {doctor?.name}
          </h2>
          <h2 className="border-b pb-3 mb-3">
            {doctor?.email} | {doctor?.phone}
          </h2>
        </div>
        <div className="">
          <ApproveBtn status={status} profileId={doctorProfile?.id ?? ""} />
          <h2 className="border-b pb-3 mb-3">
            Appointments ({appointments.length.toString().padStart(2, "0")})
          </h2>
        </div>
      </div>
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="practice">Práctica</TabsTrigger>
          <TabsTrigger value="additional">Adicional</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-4">
            <SubHeading title="Información Básica" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">First Name :</span>
                <span>{doctorProfile?.firstName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Last Name :</span>
                <span>{doctorProfile?.lastName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Date of Birth :</span>
                <span>{getNormalDate(dob as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Middle Name :</span>
                <span>{doctorProfile?.middleName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Gender :</span>
                <span>{doctorProfile?.gender}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Profile Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Licencia Médica :</span>
                <span>{doctorProfile?.medicalLicense}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Años de Experiencia :</span>
                <span>{doctorProfile?.yearsOfExperience}</span>
              </div>
            </div>
            <div className="py-3 space-y-3">
              <div className="flex items-center">
                <span className="mr-3">Expiración de la Licencia Médica :</span>
                <span>{getNormalDate(expiry as string)}</span>
              </div>
              <p>{doctorProfile?.bio}</p>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Contact Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Correo Electrónico :</span>
                <span>{doctorProfile?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Teléfono :</span>
                <span>{doctorProfile?.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">País :</span>
                <span>{doctorProfile?.country}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Ciudad:</span>
                <span>{doctorProfile?.city}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Estado :</span>
                <span>{doctorProfile?.state}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="p-4">
            <SubHeading title="Información Académica" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Año de Graduación :</span>
                <span>{doctorProfile?.graduationYear}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Especialización :</span>
                <span>{doctorProfile?.primarySpecialization}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Escuela de Medicina :</span>
                <span>{doctorProfile?.medicalSchool}</span>
              </div>
              {doctorProfile?.otherSpecialties && (
                <div className="">
                  <h2>Otras Especialidades</h2>
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
              {doctorProfile?.boardCertificates && (
                <div className="">
                  <h2>Documentos Académicos</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.boardCertificates.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
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
            <SubHeading title="Información de la Práctica" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Nombre del Hospital :</span>
                <span>{doctorProfile?.hospitalName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Tarifa por Hora :</span>
                <span>{doctorProfile?.hourlyWage}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Dirección del Hospital :</span>
                <span>{doctorProfile?.hospitalAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Contacto del Hospital :</span>
                <span>{doctorProfile?.hospitalContactNumber}</span>
              </div>

              <div className="flex items-center">
                <span className="mr-3">Horario de Atención del Hospital :</span>
                <span>{doctorProfile?.hospitalHoursOfOperation}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">¿Aceptas Seguro? :</span>
                <span>{doctorProfile?.insuranceAccepted}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Correo Electrónico del Hospital :</span>
                <span>{doctorProfile?.hospitalEmailAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Sitio Web del Hospital :</span>
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
              {doctorProfile?.additionalDocs && (
                <div className="">
                  <h2>Documentos Adicionales</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.additionalDocs.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            {appointments.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/dashboard/doctor/appointments/view/${item.id}`}
                  className={cn(
                    "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                  )}
                >
                  <div className="flex justify-between items-center pb-2">
                    <h2>
                      {item.firstName} {item.lastName}
                    </h2>
                    <div className="flex items-center ">
                      <History className="w-4 h-4 mr-2" />
                      <span>{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-b">
                    <div className="flex items-center font-semibold">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      <span>{item.appointmentFormattedDate}</span>
                    </div>
                    <span className="font-semibold">
                      {item.appointmentTime}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center pt-2 text-blue-600",
                      item.status === "approved" &&
                        "text-green-600 font-semibold"
                    )}
                  >
                    {item.status === "pending" ? (
                      <CircleEllipsis className="mr-2 w-4 h-4" />
                    ) : item.status === "approved" ? (
                      <Check className="mr-2 w-4 h-4" />
                    ) : (
                      <X className="mr-2 w-4 h-4" />
                    )}
                    <span>{item.status}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
