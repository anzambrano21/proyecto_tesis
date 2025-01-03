<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historia Clínica Completa</title>
    <style>
        @page {
            size: letter;
            margin: 0.5in;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            margin: 0 auto;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.2in;
        }
        .logo {
            width: 0.8in;
            height: auto;
        }
        .title-section {
            text-align: center;
            flex-grow: 1;
            padding: 0 0.2in;
        }
        .main-title {
            font-size: 14pt;
            font-weight: bold;
            margin: 0.05in 0;
        }
        .form-number {
            text-align: right;
            font-size: 9pt;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0.1in;
        }
        td, th {
            border: 1px solid black;
            padding: 0.03in;
            font-size: 8pt;
        }
        .note {
            font-size: 7pt;
            font-style: italic;
            margin: 0.05in 0;
        }
        .section-title {
            font-weight: bold;
            margin-top: 0.1in;
            text-transform: uppercase;
        }
        .dotted-line {
            border-bottom: 1px dotted black;
            margin: 0.1in 0;
            min-height: 0.2in;
        }
        .multi-line {
            min-height: 1in;
        }
        .signature-section {
            text-align: right;
            margin-top: 0.2in;
        }
        .signature-line {
            border-top: 1px solid black;
            width: 2in;
            margin-left: auto;
            text-align: center;
            padding-top: 0.05in;
            font-size: 8pt;
        }
        .exam-section {
            display: flex;
            margin-bottom: 0.1in;
        }
        .exam-list {
            width: 50%;
            padding-right: 0.1in;
        }
        .findings {
            width: 50%;
            border-left: 1px solid black;
            padding-left: 0.1in;
        }
        .subsection {
            margin-left: 0.15in;
        }
        .discharge-options {
            display: flex;
            gap: 0.2in;
            margin: 0.1in 0;
            font-size: 9pt;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .mt-20 {
            margin-top: 0.2in;
        }
        .mb-10 {
            margin-bottom: 0.1in;
        }
        .input-field {
            border-bottom: 1px solid black;
            min-width: 0.5in;
            display: inline-block;
        }
        .checkbox {
            width: 0.12in;
            height: 0.12in;
            border: 1px solid black;
            display: inline-block;
            margin-right: 0.05in;
        }
        .historia-no {
            border: 1px solid black;
            padding: 0.05in;
            width: 1in;
            height: 0.4in;
            display: inline-block;
        }
        .flex-container { 
            display: flex; 
            justify-content: space-between; 
        } 
        .note-box { 
            width: 48%; 
            border: 1px solid #000; 
            padding: 10px; 
        }
        /* Remove any margin between the boxes */
        .note-box:first-child {
            margin-right: 0;
        }
        .note-box:last-child {
            margin-left: 0;
        }

        .findings-box {
            height: 6in;
            border: 1px solid black;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Part I -->
        <div class="header">
            <img src="logo.png" alt="Logo" class="logo">
            <div class="title-section">
                <div>INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES</div>
                <div>HOSPITAL UNIVERSITARIO DR. "ANGEL LARRALDE"</div>
                <div class="main-title">HISTORIA CLÍNICA</div>
                <div>PARTE I</div>
            </div>
            <div class="form-number">
                Forma 15-10B<br>
                HISTORIA No.
                <div class="historia-no"></div>
            </div>
        </div>

        <table>
            <tr>
                <td colspan="2">APELLIDOS: <span class="input-field"></span></td>
                <td colspan="2">NOMBRES: <span class="input-field"></span></td>
                <td>SALA O CUARTO: <span class="input-field"></span></td>
                <td>SERVICIO: <span class="input-field"></span></td>
            </tr>
            <tr>
                <td>SEXO: <span class="input-field"></span></td>
                <td>EDAD: <span class="input-field"></span></td>
                <td>EDO. CIVIL: <span class="input-field"></span></td>
                <td>OCUPACIÓN: <span class="input-field"></span></td>
                <td colspan="2">S.S.O.: <span class="input-field"></span></td>
            </tr>
        </table>

        <table>
            <tr>
                <td>LUGAR DE NACIMIENTO: <span class="input-field"></span></td>
                <td>FECHA DE NACIMIENTO: <span class="input-field"></span></td>
            </tr>
            <tr>
                <td colspan="2">DIRECCIÓN COMPLETA: <span class="input-field"></span></td>
            </tr>
            <tr>
                <td colspan="2">
                    AVISAR EN CASO DE EMERGENCIA A: <span class="input-field"></span>
                    PARENTESCO: <span class="input-field"></span>
                    DIRECCIÓN: <span class="input-field"></span>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td>FECHA DE INGRESO: <span class="input-field"></span></td>
                <td>HORA: <span class="input-field"></span></td>
                <td>FECHA DE ADMISIÓN ANTERIOR: <span class="input-field"></span></td>
                <td>RELIGIÓN: <span class="input-field"></span></td>
            </tr>
        </table>

        <table>
            <tr>
                <td>INFORMACIÓN ADICIONAL (A juicio del examinador): <span class="input-field"></span></td>
            </tr>
        </table>

        <div class="note">NOTA: Al ser admitido el paciente debe firmar la autorización que aparece al dorso de esta hoja.</div>

        <div class="section-title">MOTIVO(S) DE INGRESO</div>
        <div class="dotted-line"></div>

        <div class="section-title">ENFERMEDAD ACTUAL</div>
        <div class="note">(hacer relato conciso y completo de las dolencias, indicando: fecha de comienzo, duración y tratamiento de cada una de ellas):</div>
        <div class="dotted-line multi-line"></div>

        <div class="section-title">DIAGNÓSTICO PROVISIONAL</div>
        <div class="dotted-line"></div>

        <div class="discharge-options">
            EGRESO POR: CURACIÓN:<span class="checkbox"></span> MEJORÍA:<span class="checkbox"></span> MUERTE:<span class="checkbox"></span> (AUTOPSIA PEDIDA <span class="checkbox"></span>) OTRAS CAUSAS: <span class="checkbox"></span>
        </div>
        <div class="note text-right">(SI CONTRA OPINIÓN MÉDICA, HACERLE FIRMAR AL DORSO)</div>

        <div class="section-title">DIAGNÓSTICO CLÍNICO FINAL:</div>
        <div class="dotted-line"></div>

        <div class="mt-20">
            FECHA DE EGRESO: <span class="input-field"></span> HORA: <span class="input-field"></span> m.
        </div>

        <div class="signature-section">
            <div class="signature-line">FIRMA DEL JEFE DE SERVICIO</div>
        </div>

        <!-- Page break between Part I and Part II -->
        <div class="page-break"></div>

        <!-- Part II -->
        <div class="header">
            <img src="logo.png" alt="Logo" class="logo">
            <div class="title-section">
                <div>INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES</div>
                <div>HOSPITAL UNIVERSITARIO DR. "ANGEL LARRALDE"</div>
                <div class="main-title">HISTORIA CLINICA</div>
                <div>PARTE II</div>
            </div>
            <div>Historia No.<span class="input-field"></span></div>
        </div>

        <table>
            <tr>
                <td colspan="2">NOMBRE: <span class="input-field"></span></td>
                <td>SALA O CUARTO: <span class="input-field"></span></td>
                <td>CAMA: <span class="input-field"></span></td>
                <td>SERVICIO: <span class="input-field"></span></td>
            </tr>
        </table>

        <table>
            <tr>
                <td>TEMPERATURA: <span class="input-field"></span> ºC</td>
                <td>PULSO: <span class="input-field"></span> p.p.m</td>
                <td>RESPIRACIÓN: <span class="input-field"></span> r.p.m.</td>
                <td>TENSIÓN ARTERIAL: <span class="input-field"></span> MX <span class="input-field"></span> MN</td>
            </tr>
            <tr>
                <td>FRECUENCIA CARDIACA: <span class="input-field"></span> i.p.m.</td>
                <td>PESO: <span class="input-field"></span> kgs.</td>
                <td>TALLA: <span class="input-field"></span> cm.</td>
                <td>GRASA CORPORAL (Cintura/Cadera): <span class="input-field"></span> IMC: <span class="input-field"></span> Kg/cm²</td>
            </tr>
        </table>
        <table>
            <tr>
                <td > 
               Marcar así: √ lo encontrado normal después de examinar. Dejar en blanco lo no encontrado o interrogado.
                </td>
                <td>
                    Marcar así: x en la columna de la izquierda lo encontrado anormal al examen y describirlo en esta columna usando los números de referencia dados para ahorrar espacio y tiempo al escribirlo. 
                </td>
            </tr>
            <tr>
                <td>
                <div class="exam-list">
                    <div class="section-title">EXAMEN FÍSICO</div>
                    <div class="note">(Datos Objetivos)</div>
            
                    <div class="section-title">1.- PIEL</div>
                    <div class="subsection">
                        1.1 Color<br>
                        1.2 Humedad<br>
                        1.3 Contextura<br>
                        1.4 Temperatura<br>
                        1.5 Pigmentación<br>
                        1.6 Equimosis<br>
                        1.7 Ictericia<br>
                        1.8 Petequias<br>
                        1.9 Erupción
                    </div>

                    <div class="section-title">2.- CABEZA</div>
                    <div class="subsection">
                        2.1 Configuración<br>
                        2.2 Fontanelas<br>
                        2.3 Reblandecimiento<br>
                        2.4 Circunferencia<br>
                        2.5 Dolor<br>
                        2.6 Cabellos<br>
                        2.7 Otros
                    </div>

                    <div class="section-title">3.- OJOS</div>
                    <div class="subsection">
                        3.1 Conjuntiva<br>
                        3.2 Esclerótica<br>
                        3.3 Córnea<br>
                        3.4 Pupilas<br>
                    </div>
                </div>
                </td>
                <td></td>
            </tr>



        </table>
        <div class="container diagServi">
            <p>Diagnóstico del Servicio:</p>

        </div>

        
    </div>



    </div>
</body>
</html>