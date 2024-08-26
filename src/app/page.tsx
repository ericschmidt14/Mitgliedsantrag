"use client";
import { useState } from "react";
import { Stepper, Button, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues, getInitialValues } from "./form";
import { validateForm } from "./validation";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import Step6 from "./steps/6";

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

  return (
    <section className="flex flex-col justify-center items-center">
      <form
        className="w-full md:w-[768px] p-4 flex flex-col"
        onSubmit={form.onSubmit((values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify(values, null, 2),
          })
            .then((res) => res.text())
            .then((data) => {
              console.log(data);
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
              position: "relative",
              margin: "16px auto",
              padding: "48px 32px",
              borderRadius: "var(--mantine-radius-md)",
              background: "rgba(255, 255, 255, 0.0925)",
              boxShadow: "var(--mantine-shadow-xl)",
            },
            steps: {
              width: "320px",
              margin: "0 auto",
            },
            stepBody: {
              display: "none",
            },
            stepIcon: { boxShadow: "var(--mantine-shadow-xl)" },
            separator: {
              marginLeft: rem(-2),
              marginRight: rem(-2),
            },
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
            <b>Antrag erfolgreich abgeschickt!</b> Du erhältst in Kürze weitere
            Informationen.
          </Stepper.Completed>
        </Stepper>

        <div className="w-full m-auto flex justify-between px-4">
          {active > 0 ? (
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
