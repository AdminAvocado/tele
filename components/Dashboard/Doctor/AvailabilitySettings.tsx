"use client";
import React from "react";
import { Tabs } from "flowbite-react";
import Monday from "./AvailabilityDays/Monday";
import { DoctorProfile } from "@prisma/client";
import Tuesday from "./AvailabilityDays/Tuesday";
import Wednesday from "./AvailabilityDays/Wednesday";
import Thursday from "./AvailabilityDays/Thursday";
import Friday from "./AvailabilityDays/Friday";
import Saturday from "./AvailabilityDays/Saturday";
import Sunday from "./AvailabilityDays/Sunday";
export default function AvailabilitySettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  const tabs = [
    {
      title: "Lunes",
      component: <Monday profile={profile} day="monday" />,
    },
    {
      title: "Martes",
      component: <Tuesday day="tuesday" profile={profile} />,
    },
    {
      title: "Miercoles",
      component: <Wednesday profile={profile} day="wednesday" />,
    },
    {
      title: "Jueves",
      component: <Thursday profile={profile} day="thursday" />,
    },
    {
      title: "Viernes",
      component: <Friday profile={profile} day="friday" />,
    },
    {
      title: "Sábado",
      component: <Saturday profile={profile} day="saturday" />,
    },
    {
      title: "Domingo",
      component: <Sunday profile={profile} day="sunday" />,
    },
  ];
  return (
    <div>
      <p className="py-3">Por favor, agregue la disponibilidad para la semana completa</p>
      <Tabs aria-label="Tabs with underline" style="underline">
        {tabs.map((tab, i) => {
          return (
            <Tabs.Item key={i} active title={tab.title}>
              {tab.component}
            </Tabs.Item>
          );
        })}
      </Tabs>
    </div>
  );
}
