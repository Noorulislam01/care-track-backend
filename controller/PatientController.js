const express=require("express");
const Patient = require("../models/Patient");

exports.UpdateWallet = async (req, res) => {
    try {
        // Extract patientId and amount from request parameters
        const { patientId, amount } = req.params;

        // Validate input
        if (!patientId || !amount) {
            return res.status(400).json({ error: "Missing patientId or amount" });
        }

        // Convert amount to a number
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Update the wallet balance
        patient.walletBalance -= parsedAmount;

        // Save the updated patient document
        await patient.save();

        // Respond with success
        return res.status(200).json({
            message: "Wallet updated successfully",
            walletBalance: patient.walletBalance,
        });
    } catch (error) {
        console.error("Error updating wallet:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


exports.FindPatient = async (req, res) => {
    try {
        // Extract patientId and amount from request parameters
        const { patientId } = req.params;

        // Validate input
        if (!patientId) {
            return res.status(400).json({ error: "Missing patientId " });
        }

        // Convert amount to a number
       
        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Update the wallet balance
       

        // Respond with success
        return res.status(200).json({
           patient:patient
        });
    } catch (error) {
        console.error("Error updating wallet:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};