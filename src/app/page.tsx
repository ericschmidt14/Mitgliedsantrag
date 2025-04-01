"use client";
import { Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useState } from "react";
import Footer from "./components/footer";
import { FormWrapper } from "./components/form";
import Header from "./components/header";
import StepperIndicator from "./components/stepper";
import Title from "./components/title";
import { FormValues, getInitialValues } from "./form/form";
import { validateForm } from "./form/validation";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import Step6 from "./steps/6";
import Step7 from "./steps/7";

export default function Home() {
  const [active, setActive] = useState(0);

  const STEPS = 7;

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
            className="w-full md:w-[768px] p-4 flex flex-col"
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

              fetch("/api/save", {
                method: "POST",
                body: JSON.stringify(data, null, 2),
              })
                .then((res) => res.text())
                .then(() => {
                  nextStep();
                })
                .catch((error) => console.error(error));
            })}
          >
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
                    vielen Dank für Deine Anmeldung beim 1. FC Nürnberg. <br />
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
                <Button onClick={nextStep} disabled={!form.isValid()}>
                  Weiter
                </Button>
              )}
              {active === STEPS - 1 && (
                <Button type="submit" disabled={!form.isValid()}>
                  Antrag abschicken
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}
