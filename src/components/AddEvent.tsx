import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { formatDate, toDate } from "@/utils/date";
import { useMutation } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase";
import { useState } from "react";
import { eventFormSchema, FormFields } from "@/schemas/event";
import { ComboboxDemo } from "./ui/combobox";

export function AddEvent() {
  const [open, setOpen] = useState(false);

  const { handleSubmit, formState, control, register, reset } =
    useForm<FormFields>({
      resolver: zodResolver(eventFormSchema),
    });

  const mutation = useMutation({
    mutationKey: ["events"],
    mutationFn: (data: FormFields) => {
      return pb.collection("events").create(data);
      // console.log(data);
    },
    onSuccess: (resp) => {
      console.log(resp);
      reset();
      setOpen(false);
    },
    onError: (err) => console.log(err),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutation.mutate(data);
  };

  console.log(formState.errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="w-4 h-4 mr-1" /> New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg flex flex-col  overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" className="col-span-4" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salutation" className="text-left">
              Salutation
            </Label>
            <Input
              id="salutation"
              className="col-span-4 "
              {...register("salutation")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_of_birth" className="text-left">
              Date of Birth
            </Label>
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field }) => (
                <div className="col-span-4 ">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <span>{formatDate(field.value)} </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Person
            </Label>
            <Controller
              name="person"
              control={control}
              render={({ field }) => (
                <ComboboxDemo value={field.value} setValue={field.onChange} />
              )}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Additional Info
            </Label>
            <Textarea
              className="col-span-4"
              placeholder="Type your message here."
              {...register("additional_info")}
            />
          </div>
        </div>
        <div className="absolute w-full bottom-0 left-0 flex justify-end p-6  ">
          <Button
            // disabled={!formState.isValid}
            onClick={handleSubmit(onSubmit)}
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
