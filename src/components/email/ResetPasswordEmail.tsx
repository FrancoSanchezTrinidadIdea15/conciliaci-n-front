import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  userName: string;
  resetLink: string;
}

export default function ResetPasswordEmail({
  userName,
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Restablece tu contraseña</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            {/* Logo o nombre de la aplicación */}
            <Text style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const }}>
              Conciliación Bancaria
            </Text>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hola {userName},</Text>
            <Text style={paragraph}>
              Has solicitado restablecer tu contraseña. Haz clic en el botón a continuación para crear una nueva contraseña:
            </Text>
            <Button style={button}  href={resetLink}>
              Restablecer contraseña
            </Button>
            <Text style={paragraph}>
              Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
            </Text>
            <Text style={paragraph}>
              Por seguridad, este enlace expirará en 1 hora.
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Saludos,<br />El equipo de soporte
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos inspirados en shadcn/ui
const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logo = {
  padding: '32px 0',
};

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  padding: '32px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#334155',
};
//el boton quiero que sea mas ancho y mas alto como el de shadcn/ui
const button = {
  backgroundColor: '#000000',
  borderRadius: '8px',
  color: '#fff',
  padding: '12px 24px',
  fontWeight: '600',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: 'auto',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#64748b',
};