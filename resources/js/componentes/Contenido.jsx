import { FileText, FileIcon as FilePresentation, ChevronRight } from "lucide-react"
import React, { useEffect, useState } from 'react';
export const Contenido=({registro})=>{
    const [isExpanded, setIsExpanded] = useState(true)
    return(
        <div className="container py-4">
        {/* Topic Header - Always visible */}
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="d-flex align-items-center gap-3 w-100 bg-white border-0 p-3 rounded"
            aria-expanded={isExpanded}
        >
            <div
                className="rounded-circle border border-2 border-success d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
            >
                <ChevronRight
                    className={`text-success ${isExpanded ? "rotate-90" : ""}`}
                    style={{
                        transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                />
            </div>
            <h2 className="h4 mb-0">Num Con</h2>
            
        </button>

        {/* Collapsible Content */}
        <div className={`collapse ${isExpanded ? "show" : ""}`}>
            <div className="card border-0 shadow-sm mt-2">
                <div className="card-body">
                    {/* Unit Title */}
                    <div className="text-center mb-4">
                        <h1 className="display-6 text-primary fw-bold">{registro.material.Titulo}</h1>
                        
                    </div>


                    <div className="bg-light p-3 rounded mb-4">
                        <p className="mb-0">
                            
                            <strong>Objetivo.</strong>
                            {registro.material.COntenido}
                        </p>
                    </div>

                    {/* Resources */}
                    <div className="mb-4">
                        <a href="#" className="d-flex align-items-center text-decoration-none text-success mb-2 gap-2">
                            <FileText size={20} />
                            <span>material_de_consulta_Unidad_IV</span>
                        </a>
                        <a href="#" className="d-flex align-items-center text-decoration-none text-success gap-2">
                            <FilePresentation size={20} />
                            <span>El Proceso Gerencial y La Planificación.</span>
                        </a>
                    </div>

                    {/* Learning Check */}

                    {/* Task */}

                </div>
            </div>
        </div>
    </div>
    )
}