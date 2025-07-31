import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useTranslations } from "@/hooks/use-translations";
import { Send, Loader2, Check } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-brand-red">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>

          {/* Contact Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-2xl text-left">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        {t("form.name_label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.name_placeholder")}
                          className="border-gray-300 focus:ring-brand-red focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        {t("form.email_label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("form.email_placeholder")}
                          className="border-gray-300 focus:ring-brand-red focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        {t("form.company_label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.company_placeholder")}
                          className="border-gray-300 focus:ring-brand-red focus:border-transparent"
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        {t("form.service_label")}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-brand-red focus:border-transparent">
                            <SelectValue placeholder={t("form.service_placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tiktok-ads">{t("form.tiktok_ads")}</SelectItem>
                          <SelectItem value="google-ads">{t("form.google_ads")}</SelectItem>
                          <SelectItem value="microsoft-ads">{t("form.microsoft_ads")}</SelectItem>
                          <SelectItem value="facebook-ads">{t("form.facebook_ads")}</SelectItem>
                          <SelectItem value="consultation">{t("form.consultation")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        {t("form.message_label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder={t("form.message_placeholder")}
                          className="border-gray-300 focus:ring-brand-red focus:border-transparent resize-vertical"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending || isSubmitted}
                className={`w-full font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitted 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-brand-red hover:bg-red-600"
                }`}
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>{t("form.submit_button")}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                {t("form.privacy_notice")}
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
