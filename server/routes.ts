import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get translations by language
  app.get("/api/translations/:lang", async (req, res) => {
    try {
      const { lang } = req.params;
      
      // Validate language parameter
      if (!lang || !["en", "vi"].includes(lang)) {
        return res.status(400).json({ 
          message: "Invalid language parameter. Supported languages: en, vi" 
        });
      }

      const translations = await storage.getTranslationsByLang(lang);
      
      // Convert array to key-value object for easier frontend consumption
      const translationsMap = translations.reduce((acc, translation) => {
        acc[translation.key] = translation.value;
        return acc;
      }, {} as Record<string, string>);

      res.json(translationsMap);
    } catch (error) {
      console.error("Error fetching translations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationResult.error.errors 
        });
      }

      const contactData = validationResult.data;
      
      // Create contact in storage
      const contact = await storage.createContact(contactData);
      
      console.log("New contact submission:", contact);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
