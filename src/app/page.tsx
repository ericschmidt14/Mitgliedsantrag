"use client";
import { Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { FormWrapper } from "./components/form";
import StepperIndicator from "./components/stepper";
import Title from "./components/title";
import { FormValues, getInitialValues } from "./form";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import Step6 from "./steps/6";
import { validateForm } from "./validation";

export default function Home() {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    validateInputOnChange: true,
    initialValues: getInitialValues(),
    validate: (values: FormValues) => validateForm(active, values),
  });

  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));

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
    <section className="flex flex-col justify-center items-center">
      <StepperIndicator steps={6} active={active} />
      <form
        className="w-full md:w-[768px] p-4 flex flex-col"
        onSubmit={form.onSubmit(async (values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify(
              {
                ...values,
                certificate:
                  values.certificate &&
                  (await fileToBase64(values.certificate)),
              },
              null,
              2
            ),
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
          <Stepper.Completed>
            <FormWrapper>
              <Title text="Antrag erfolgreich abgeschickt!" />
              <p>Liebes Neu-Mitglied,</p>
              <p>
                vielen Dank für Deine Anmeldung beim 1. FC Nürnberg. <br />
                Du solltest eine E-Mail erhalten haben die Du bestätigen musst.
                Bitte überprüfe auch Deinen SPAM Ordner.
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
          {active > 0 && active < 6 ? (
            <Button variant="transparent" onClick={prevStep}>
              Zurück
            </Button>
          ) : (
            <div />
          )}
          {active < 5 && (
            <Button onClick={nextStep} disabled={!form.isValid()}>
              Weiter
            </Button>
          )}
          {active === 5 && (
            <Button type="submit" disabled={!form.isValid()}>
              Antrag abschicken
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
