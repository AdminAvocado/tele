import { getPatientAppointments } from "@/actions/appointments";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }
  const appointments = (await getPatientAppointments(user?.id)).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Citas"
            count={appointments.length ?? 0}
            icon={Calendar}
          />
          <div className="px-3">
            <ListPanel role={user.role} appointments={appointments} />
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
