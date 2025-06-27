"use client";
import { Alert, Button, Paper, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronRight,
  IconExclamationCircle,
  IconRepeat,
  IconSend,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Footer from "./components/footer";
import { FormWrapper } from "./components/form";
import Header from "./components/header";
import StepperIndicator from "./components/stepper";
import Title from "./components/title";
import { FormValues, getInitialValues } from "./form/form";
import { validateForm } from "./form/validation";
import { CONTACT_EMAIL } from "./lib/constants";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import Step6 from "./steps/6";
import Step7 from "./steps/7";

export default function Home() {
  const searchParams = useSearchParams();
  const isManual = searchParams.has("manuell");

  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);

  const STEPS = 7;
  const today = new Date();
  const fourteenYearsAgo = new Date();
  fourteenYearsAgo.setFullYear(today.getFullYear() - 14);

  const form = useForm<FormValues>({
    validateInputOnChange: true,
    initialValues: getInitialValues(),
    validate: (values: FormValues) => validateForm(active, values),
  });

  const nextStep = () =>
    setActive((current) => (current < STEPS ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between">
        <Header />
        <section className="flex flex-col justify-center items-center">
          <StepperIndicator steps={STEPS} active={active} />
          <form
            className="w-full md:w-[768px] flex flex-col"
            onSubmit={form.onSubmit(async (values) => {
              const data = {
                ...values,
                dob: dayjs(values.dob).format("YYYY-MM-DD"),
                parentDob:
                  values.parentDob &&
                  dayjs(values.parentDob).format("YYYY-MM-DD"),
                entryDate: dayjs(values.entryDate).format("YYYY-MM-DD"),
                certificate:
                  values.certificate &&
                  (await fileToBase64(values.certificate)),
              };

              if (
                values.applicantType === "self" ||
                dayjs(values.dob).isAfter(fourteenYearsAgo) ||
                !/\S+@\S+\.\S+/.test(values.memberEmail)
              ) {
                data.memberEmail = values.email;
              }

              if (
                values.applicantType === "parent" &&
                values.parentAddressIsIdentical
              ) {
                data.parentStreet = values.street;
                data.parentPostalCode = values.postalCode;
                data.parentCity = values.city;
                data.parentCountry = values.country;
              }

              if (values.certificate) {
                data.certificateName = values.certificate.name;
              }

              if (isManual) {
                data.isManual = true;
              }

              fetch("/api/save", {
                method: "POST",
                body: JSON.stringify(data, null, 2),
              })
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`Error: ${res.status} - ${res.statusText}`);
                  }
                  return res.text();
                })
                .then((token) => {
                  nextStep();
                  if (isManual) {
                    fetch(`/api/confirm/${JSON.parse(token)}`, {
                      method: "GET",
                      headers: { Accept: "*/*" },
                    })
                      .then((res) => {
                        if (!res.ok) {
                          throw new Error("Manuelles confirm fehlgeschlagen.");
                        }
                        return res.status;
                      })
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((error) => {
                        console.error(error);
                        setError(true);
                      });
                  }
                })
                .catch((error) => {
                  console.error(error);
                  setError(true);
                });
            })}
          >
            {error ? (
              <Paper p="xl" radius="md" bg="rgba(0, 0, 0, 0.5)">
                <div className="flex flex-col items-center gap-4">
                  <IconExclamationCircle size={48} color="#aa1124" />
                  <h2>Es ist ein Fehler aufgetreten.</h2>
                  <p>
                    Leider konnte der Antrag nicht abgeschickt werden. Bitte
                    versuche es erneut. <br />
                    Sollte der Fehler weiterhin bestehen bleiben, wende dich
                    bitte an{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                  <Button
                    onClick={() => {
                      setActive(1);
                      setError(false);
                    }}
                    leftSection={<IconRepeat size={17} />}
                  >
                    Erneut versuchen
                  </Button>
                </div>
              </Paper>
            ) : (
              <>
                <Stepper
                  active={active}
                  allowNextStepsSelect={false}
                  iconSize={32}
                  size="sm"
                  styles={{
                    content: {
                      margin: "16px auto",
                      padding: "48px 32px",
                      background: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "8px",
                    },
                    step: { display: "none" },
                    steps: { display: "none" },
                  }}
                >
                  <Stepper.Step>
                    {isManual && (
                      <Alert
                        variant="light"
                        title="Achtung! Dies ist ein händischer Antrag ohne Mailversand."
                        icon={<IconExclamationCircle />}
                        className="mb-8"
                      />
                    )}
                    <Step1 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step2 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step3 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step4 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step5 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step6 form={form} />
                  </Stepper.Step>
                  <Stepper.Step>
                    <Step7 form={form} />
                  </Stepper.Step>
                  <Stepper.Completed>
                    <FormWrapper>
                      <Title text="Antrag erfolgreich abgeschickt!" />
                      <p>Liebes Neumitglied,</p>
                      <p>
                        vielen Dank für Deine Anmeldung beim 1. FC Nürnberg.{" "}
                        <br />
                        Du solltest eine E-Mail erhalten haben die Du bestätigen
                        musst. Bitte überprüfe auch Deinen Spam Ordner.
                      </p>

                      <p>
                        Beste Grüße vom Club
                        <br />
                        Dein Mitgliederservice des 1. FCN
                      </p>
                    </FormWrapper>
                  </Stepper.Completed>
                </Stepper>
                <div className="w-full m-auto flex justify-between px-8">
                  {active > 0 && active < STEPS ? (
                    <Button variant="transparent" onClick={prevStep}>
                      Zurück
                    </Button>
                  ) : (
                    <div />
                  )}
                  {active < STEPS - 1 && (
                    <Button
                      onClick={nextStep}
                      disabled={!form.isValid()}
                      rightSection={<IconChevronRight size={16} />}
                    >
                      Weiter
                    </Button>
                  )}
                  {active === STEPS - 1 && (
                    <Button
                      type="submit"
                      disabled={!form.isValid()}
                      rightSection={<IconSend size={16} />}
                    >
                      Antrag abschicken
                    </Button>
                  )}
                </div>
              </>
            )}
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}
