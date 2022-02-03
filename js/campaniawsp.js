




    function gotoStepCampanaWp(orden) {
        // 1 - 4
        let orderReal = orden - 1;
        let stepsSelectors = $('#steps-campana-wp-creacion li').get() // 0 - 1 - 2 - 3
        stepsSelectors.forEach((li, index) => {

            li.classList.remove('active')
            li.classList.remove('complete')

            if (index == orderReal) {
                li.classList.add('active')
            }
            else if (index < orderReal){
                li.classList.add('complete')
            }
        })

        let seccionDisponibles = document.querySelectorAll('.section-campana')
        seccionDisponibles.forEach(sec  => {
            sec.classList.add('d-none')
        })
        $(`#campana-${orden}`).removeClass('d-none')
    }

    function GotoCampanaWpInit(orden) {
        gotoStepCampanaWp(orden)
    }

    var IdsVariablePlantillas = []
    $('#cbo-plantillas-campanawsp').change(function () {

        if ($(this).val() == "0") {
            $('#txt-mensajeplantilla-campanawsp').empty()
            $('#table-variablesplantilla-camapanwsp').empty()
            $('#table-variablesplantilla-camapanwsp').append('<tr><td style="text-align: center; font-size: 15px; color: #828c92">No hay variables a mostrar</td></tr>')
        }
        else {
            IdsVariablePlantillas = []
            FnListadoVariablesPlantillaCampanaWsp($(this).val())
        }
    });

    
    FnListadoVariablesPlantillaCampanaWsp= (codigoPlantilla) => {
        let codigoBot = $('#txt-codigobot-hidden').val()
        $.ajax({
            type: "POST",
            url: "/Bots/GetListadoVariablesPorPlantillasInner",
            beforeSend: function () {
                $('#panel-loadingvariablesplantilla-campanawsp').css('display', 'block');
            },
            data: JSON.stringify({ codigoPlantilla: codigoPlantilla, codigoBot: codigoBot }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('#txt-mensajeplantilla-campanawsp').empty()
                if (data[0].MensajePlantilla)
                    $('#txt-mensajeplantilla-campanawsp').append(data[0].MensajePlantilla)

                $('#table-variablesplantilla-camapanwsp').empty();
                if (data[0].ListadoVariables.length > 0) {
                    $(data[0].ListadoVariables).each(function (i, item) {

                        IdsVariablePlantillas.push(item.Id);
                        $('#table-variablesplantilla-camapanwsp').append(`
                                    <tr>
                                        <td><span style="word-break: normal; line-height: 3.5; font-size: 15px" class="label-step2"  data-nombrevariable="${item.Variable}" data-idvariable="${item.Id}" id="idvariablePlantillaCampanaWsp-${item.Id}">${item.Variable}</span></td>
                                        <td class="align-middle" id="select-questiontype-${item.Id}">
                                            <select class="form-control form-control-sm selects-campana-2" id="cbo-variablesCampanaWsp-${item.Id}">
                                                <option selected  value="0">-- Seleccionar una opción --</option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="EMAIL"           value="1">Correo Electrónico    </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="FULL_NAME"       value="2">Nombre Completo       </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="PHONE"           value="3">Número de Teléfono    </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="STREET_ADDRESS"  value="4">Dirección             </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="DOB"             value="5">Fecha de Nacimiento   </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="JOB_TITLE"       value="6">Cargo                 </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="GENDER"          value="7">Sexo                  </option>
                                                <option data-idvariable="${item.Id}"  data-questionstype="COMPANY_NAME"    value="8">Nombre de la Empresa  </option>
                                            </select>                                            
                                        </td>
                                    </tr>`);
                        if (parseInt(item.IdQuestionType) != 0) {
                            $(`#cbo-variablesCampanaWsp-${item.Id} option[value=${item.IdQuestionType}]`).attr('selected', true);
                        }
                    });
                }
                else {

                    $('#table-variablesplantilla-camapanwsp').append('<tr><td style="text-align: center; font-size: 15px; color: #828c92">No hay variables a mostrar</td></tr>')
                }
            },
            failure: function () {
                console.log("listado variables plantilla capana wsp failure");
            },
            error: function () {
                console.log("listado variables plantilla campana wsp error");
            },
            complete: function () {
                $('#panel-loadingvariablesplantilla-campanawsp').css('display', 'none');
            }
        });
    }

    $(document).ready(() => {
        $('#cbo-usuarioasignado-campanawsp , #cbo-botreferenciacontactos-campanawsp ,#cbo-embudoventascontacto-campanawsp , #cbo-plataformacontactos-campanawsp , #cbo-segmentacioncontactos-campanawsp').select2({
            placeholder: '-- seleccionar una opción --',
            searchInputPlaceholder: 'Buscar opción',
            width: '100%'
        })

        
    $('#btn-crearnuevacampana-modal').click(function () {
        $('#modal-crearcampana-wsp').modal('show')
    });


    $('#btn-comenzar-creacion-campanawsp').click(function () {
        $('#modal-crearcampana-wsp').modal('hide');
        $('#contenedor-pasos-crearcampana').removeClass('d-none')
        $('#principal-campana-whatsapp').addClass('d-none')
    });

    $('#btn-back-campana-whatsapp').click(function () {
        $('#modal-crearcampana-wsp').modal('hide');
        $('#contenedor-pasos-crearcampana').addClass('d-none')
        $('#principal-campana-whatsapp').removeClass('d-none')
    });

    $('#label-programar-envio').click(function () {
        $('#contenedor-fechayhora-envio-programado').removeClass('d-none')
    });

    $('#label-enviar-ahora').click(function () {
        $('#contenedor-fechayhora-envio-programado').addClass('d-none')
    });


    })
