"use client";

import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";


export function useAuthContext() {
    const context = useContext(AuthContext)

    if(context === undefined) {
        throw new Error("Não está dentro do contexto de autenticação")
    }

    return context
};