"use server";

import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/types";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function createAppointment(data: AppointmentProps) {
  try {
    const doctor = await prismaClient.user.findUnique({
      where: {
        id: data.doctorId,
      },
    });
    const newAppointment = await prismaClient.appointment.create({
      data,
    });
    const firstName = doctor?.name;
    const doctorMail = doctor?.email;
    const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
    const message =
      "Tienes una nueva cita programada, por favor revisa y aprueba la cita por favor.";
    const sendMail = await resend.emails.send({
      from: "Telemedicina <contact@avocadobytes.com>",
      to: doctorMail ?? "",
      subject: "Nueva cita programada, se requiere aprobación",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/doctor/appointments");
    console.log(newAppointment);

    //Send the Email to the Doctor
    //
    return {
      data: newAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointment(id: string, data: AppointmentProps) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/doctor/appointments");
    console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointmentById(
  id: string,
  data: AppointmentUpdateProps
) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    const patientId = updatedAppointment.patientId;
    const patient = await prismaClient.user.findUnique({
      where: {
        id: patientId,
      },
    });
    const firstName = patient?.name;
    const doctorMail = patient?.email;
    const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
    const message =
      "Tu cita ha sido aprobada. Puedes ver los detalles aquí";
    const sendMail = await resend.emails.send({
      from: "Telemedicina <contact@avocadobytes.com>",
      to: doctorMail ?? "",
      subject: "Tu cita ha sido aprobada",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/doctor/appointments");
    revalidatePath("/dashboard/user/appointments");
    console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getAppointments() {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getPatientAppointments(patientId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        patientId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentByPatientId(patientId: string | undefined) {
  if (patientId) {
    try {
      const appointment = await prismaClient.appointment.findFirst({
        where: {
          patientId,
        },
      });
      if (!appointment) {
        return null;
      }
      return appointment as Appointment;
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error,
      };
    }
  }
}
export async function getDoctorAppointments(doctorId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        doctorId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentById(id: string) {
  try {
    if (id) {
      const appointment = await prismaClient.appointment.findUnique({
        where: {
          id,
        },
      });
      return appointment;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteAppointment(id: string) {
  try {
    await prismaClient.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/doctor/appointments");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
