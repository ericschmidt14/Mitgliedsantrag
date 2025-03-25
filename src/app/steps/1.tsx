"use client";
import { SegmentedControl } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconGift, IconMoodKid, IconUserCircle } from "@tabler/icons-react";
import { FormWrapper } from "../components/form";
import Label from "../components/label";
import Title from "../components/title";
import { FormValues } from "../form/form";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const isMobile = useMediaQuery("(max-width: 620px)");
  const applicantTypes = [
    {
      label: "für mich.",
      icon: <IconUserCircle size={48} stroke={1} />,
      value: "self",
    },
    {
      label: "für mein minderjähriges Kind.",
      icon: <IconMoodKid size={48} stroke={1} />,
      value: "parent",
    },
    {
      label: "ein Geschenk.",
      icon: <IconGift size={48} stroke={1} />,
      value: "gift",
    },
  ];

  return (
    <FormWrapper>
      <Title text="Die Legende lebt durch dich" />
      <p>
        Du bist willensstark und leidensfähig? Oder eher locker und unaufgeregt?
        Welcher Typ Du auch bist, egal, wo Du herkommst und wie Du aussiehst,
        wie alt oder wie reich Du bist - wir haben Großes mit Dir vor: In den
        nächsten Jahren wollen wir unsere Mitgliederzahl auf 50.000 verdoppeln.
        Das ist ambitioniert, doch gemeinsam können wir es schaffen.
      </p>
      <p>
        <b>Werde Mitglied - werde #TEILDERLEGENDE</b>
      </p>
      <div className="pt-16">
        <Label text="Dieser Mitgliedsantrag ist ..." />
        <SegmentedControl
          key={form.key("applicantType")}
          {...form.getInputProps("applicantType")}
          fullWidth
          data={applicantTypes.map((t) => {
            return {
              label: (
                <div className="flex flex-col items-center gap-1 py-1">
                  {t.icon}
                  <p>{t.label}</p>
                </div>
              ),
              value: t.value,
            };
          })}
          orientation={isMobile ? "vertical" : "horizontal"}
          transitionDuration={500}
          transitionTimingFunction="linear"
        />
      </div>
    </FormWrapper>
  );
}
