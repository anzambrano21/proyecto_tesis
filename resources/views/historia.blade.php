<?php 
use Carbon\Carbon;
$ostM=[
    'Artralgias',
    'Debilidad',
    'Dolores óseos',
    'Deformidades',
    'Otros'
];
$nerMen=[
    'Convulsiones',
    'Estática',
    'Estado emocional',
    'Marcha',
    'Parálisis',
    'Temblor',
    'Tics',
    'Tipo de personalidad',
    'Otros'
];
$extre=[
    'Color',
    'Edemas',
    'Temblor',
    'Deformidades',
    'Úlceras',
    'Varices',
    'Otros',
];
$neuro=[
    'Sensibilidad objetiva',
    'Movilidad',
    'Reflectividad',
    'Escritura',
    'Tróficos',
    'Marcha',
    'Romberg',
    'Orientación',
    'Lenguaje',
    'Coordinación',
    'Otros',
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historia Clínica Completa</title>
    <style>
        .two-column-container {
            display: flex;
            
        }
        .column-item {
            width: calc(50% - 5px); /* 50% de ancho menos la mitad del gap */
        }
        .parrafo {
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            width: 100%;
            max-width: 350px; /* Ajusta esto según tus necesidades */
             /* Solo para visualización */
            position:absolute;
            padding: 0; /* Eliminamos el padding */
            margin-left: 20px; /* Eliminamos todos los márgenes */
            line-height: 1.2; /* Ajustamos el interlineado para un aspecto más compacto */
        }
        .checked { background-color: #000; }
        @page {
            size: letter;
            margin: 0.5in;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 5pt;
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
            font-size: 8pt;
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
        .sinb{
            border-color: #ffffff;
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
            width: 100%;
            padding-right: 0.1in;
            border-color:#00ff00;
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
            font-size: 8pt;
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

                <div class="main-title">HISTORIA CLÍNICA</div>
                <div>PARTE I</div>
            </div>
            <div class="form-number">
                Forma 15-10B<br>
                HISTORIA No. {{$data->id}}
                
            </div>
        </div>

        <table>
            <tr>
                <td colspan="2">APELLIDOS: <span class="input-field">{{$data->user->Nombre}}</span></td>
                <td colspan="2">NOMBRES: <span class="input-field">{{$data->user->Nombre}}</span></td>
                <td>SERVICIO:<span class="input-field">{{$data->servicio}}</span></td>
                
            </tr>
            <tr>
                
                <td>SEXO: <span class="input-field">{{$data->servicio}}</span></td>
                <td>EDAD: <span class="input-field">{{$data->edad}}</span></td>
                <td>EDO. CIVIL: <span class="input-field">{{$data->estadoC}}</span></td>
                <td colspan="2">OCUPACIÓN: <span class="input-field">{{$data->ocupacion}}</span></td>
                
            </tr>
        </table>

        <table>
            <tr>
                <td>LUGAR DE NACIMIENTO: <span class="input-field">{{$data->user->Lugar}}</span></td>
                <td>FECHA DE NACIMIENTO: <span class="input-field">{{$data->user->fechaN}}</span></td>
            </tr>
            <tr>
                <td colspan="2">DIRECCIÓN COMPLETA: <span class="input-field">{{$data->direccion}}</span></td>
            </tr>
            
        </table>

        <table>
            <tr>
                <td>FECHA DE INGRESO: <span class="input-field">{{Carbon::parse($data->created_at)->toDateString()}}</span></td>
                
            </tr>
        </table>




        <div class="section-title">MOTIVO(S) DE INGRESO</div>
        <div class="dotted-line">{{$data->motivoIngreso}}</div>

        <div class="section-title">ENFERMEDAD ACTUAL</div>
        <div class="note">(hacer relato conciso y completo de las dolencias, indicando: fecha de comienzo, duración y tratamiento de cada una de ellas):</div>
        <div class="dotted-line multi-line">{{$data->enfermedadAct}}</div>

        <div class="section-title">DIAGNÓSTICO PROVISIONAL</div>
        <div class="dotted-line">{{$data->diagnosPro}}</div>
        @if($data->egreso=='MEJORÍA')
        <div class="discharge-options">
            EGRESO POR: CURACIÓN:<span class="checkbox "></span> MEJORÍA:<span class="checkbox checked">
        </div>
        @elseif($data->egreso=='CURACIÓN')
        <div class="discharge-options">
            EGRESO POR: CURACIÓN:<span class="checkbox checked"></span> MEJORÍA:<span class="checkbox">
        </div>
       
        @else
        <div class="discharge-options">
            EGRESO POR: CURACIÓN:<span class="checkbox"></span> MEJORÍA:<span class="checkbox">
        </div>
       
        @endif
        
        <div class="note text-right">(SI CONTRA OPINIÓN MÉDICA, HACERLE FIRMAR AL DORSO)</div>

        <div class="section-title">DIAGNÓSTICO CLÍNICO FINAL:</div>
        <div class="dotted-line"></div>




        <!-- Page break between Part I and Part II -->
        <div class="page-break"></div>

        <!-- Part II -->
        <div class="header">
        <img src="{{ public_path('logo.png') }}" alt="Logo" class="logo">
        <div class="title-section">
            <div class="main-title">HISTORIA CLINICA</div>
            <div>PARTE II</div>
        </div>
        <div class="form-number">Historia No. {{$data->id}}</div>
    </div>

    <table>
        <tr>
            <td>NOMBRE: <span class="input-field">{{$data->user->Nombre}}</span></td>
            <td>SERVICIO: <span class="input-field">{{$data->servicio}}</span></td>
            <td>PULSO: <span class="input-field"></span> p.p.m</td>
            <td>RESPIRACIÓN: <span class="input-field"></span> r.p.m.</td>
        </tr>
        <tr>                
            <td>TENSIÓN ARTERIAL: <span class="input-field"></span> MX <span class="input-field"></span> MN</td>
            <td>PESO: <span class="input-field"></span> kgs.</td>
            <td>TALLA: <span class="input-field"></span> cm.</td>
            <td>IMC: <span class="input-field"></span> Kg/cm²</td>
        </tr>
    </table>

    <table>
        <tr>
            <td>Marcar así: √ lo encontrado normal después de examinar. Dejar en blanco lo no encontrado o interrogado.</td>
            <td>Marcar así: x en la columna de la izquierda lo encontrado anormal al examen y describirlo en esta columna usando los números de referencia dados para ahorrar espacio y tiempo al escribirlo.</td>
        </tr>
        <tr>
            <td >
                <div class="exam-list">
                    <div class="section-title">EXAMEN FÍSICO</div>
                    
                    <div class="section-title">1.- EXTREMIDADES</div>
                    <table class="checkbox-table">
                        @php $count = 0; @endphp
                        @foreach($extre as $item)
                            @if($count % 2 == 0)
                                <tr>
                            @endif
                            <td class="sinb">
                                
                                    @if(in_array($item, explode(',', $data->EXTREMIDADES)))
                                        <span class="checkbox checked"></span>
                                    @else
                                        <span class="checkbox"></span>
                                    @endif
                                    {{ $item }}
                                
                            </td>
                            @if($count % 2 == 1 || $loop->last)
                                </tr>
                            @endif
                            @php $count++; @endphp
                        @endforeach
                    </table>

                    <div class="section-title">2.- OSTEOMUSCULAR</div>
                    <table class="checkbox-table">
                        @php $count = 0; @endphp
                        @foreach($ostM as $item)
                            @if($count % 2 == 0)
                                <tr>
                            @endif
                            <td class="sinb">
                                
                                    @if(in_array($item, explode(',', $data->OSTEOMUSCULAR)))
                                        <span class="checkbox checked"></span>
                                    @else
                                        <span class="checkbox"></span>
                                    @endif
                                    {{ $item }}
                                
                            </td>
                            @if($count % 2 == 1 || $loop->last)
                                </tr>
                            @endif
                            @php $count++; @endphp
                        @endforeach
                    </table>

                    

                    <div class="section-title">3.- NERVIOSO Y MENTAL</div>
                    <table class="checkbox-table">
                        @php $count = 0; @endphp
                        @foreach($nerMen as $item)
                            @if($count % 2 == 0)
                                <tr>
                            @endif
                            <td class="sinb">
                                
                                    @if(in_array($item, explode(',', $data->EXTREMIDADES)))
                                        <span class="checkbox checked"></span>
                                    @else
                                        <span class="checkbox"></span>
                                    @endif
                                    {{ $item }}
                                
                            </td>
                            @if($count % 2 == 1 || $loop->last)
                                </tr>
                            @endif
                            @php $count++; @endphp
                        @endforeach
                    </table>


                    <div class="section-title">4.- NEUROLÓGICO Y PSÍQUICO</div>
                    <table class="checkbox-table">
                        @php $count = 0; @endphp
                        @foreach($neuro as $item)
                            @if($count % 2 == 0)
                                <tr>
                            @endif
                            <td class="sinb">
                                
                                    @if(in_array($item, explode(',', $data->NEUROLÓGICOPSÍQUICO)))
                                        <span class="checkbox checked"></span>
                                    @else
                                        <span class="checkbox"></span>
                                    @endif
                                    {{ $item }}
                                
                            </td>
                            @if($count % 2 == 1 || $loop->last)
                                </tr>
                            @endif
                            @php $count++; @endphp
                        @endforeach
                    </table>
                    
                </div>
            </td>
            <td >
                <p class="parrafo">{{$data->infoAdd}}</p>
            </td>
        </tr>
    </table>

    <div class="diagServi">
        <p>Diagnóstico del Definitivo:</p>
        <p >{{$data->diagnoServ}}</p>
    </div>

        
    </div>



    </div>
    <div class="NotasEvalua">
        
    @foreach($data->nota as $item)
    <div class="header">
            
            <div class="title-section">

                <div class="main-title">Nota de Evaluacion</div>
                
            </div>
            <div class="form-number">
                
                
            <div >{{Carbon::parse($item->created_at)->toDateString()}}</div>
            <div >{{Carbon::parse($item->created_at)->format('H:i:s')}}</div>
            </div>
        </div>
        <div>{{$item->Nota}}</div>
    
    @endforeach
    </div>
</body>
</html>