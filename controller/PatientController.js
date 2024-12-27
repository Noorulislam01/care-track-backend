const express=require("express");
const Patient = require("../models/Patient");

exports.UpdateWallet = async (req, res) => {
    try {
       
        const { patientId, amount } = req.params;


        if (!patientId || !amount) {
            return res.status(400).json({ error: "Missing patientId or amount" });
        }


        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }


        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }


        patient.walletBalance -= parsedAmount;


        await patient.save();


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

        const { patientId } = req.params;

      
        if (!patientId) {
            return res.status(400).json({ error: "Missing patientId " });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        return res.status(200).json({
           patient:patient
        });
    } catch (error) {
        console.error("Error updating wallet:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};