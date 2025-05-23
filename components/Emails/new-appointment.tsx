import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
interface NewAppointmentEmailProps {
  firstName?: string;
  link: string;
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const NewAppointmentEmail = ({
  firstName = "",
  link,
  message,
}: NewAppointmentEmailProps) => (
  <Html>
    <Head />
    <Preview>Nueva Cita</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/613a17ee-a83a-4414-b915-f863c4e23b12-gt353t.png"
          width="32"
          height="32"
          alt="Claridy"
        />

        {/* <Text style={title}>
          <strong>{firstName}</strong>, You have a new Appointment
        </Text> */}
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{firstName}</strong>!
          </Text>
          <Text style={text}>{message}</Text>

          <Button href={link} style={button}>
            Ver Cita
          </Button>
          <Text style={text}>
            Si tienes alguna pregunta, no dudes en contactarnos.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewAppointmentEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "24px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "0.75em 1.5em",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
