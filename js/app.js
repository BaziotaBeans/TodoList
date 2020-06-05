/**************************
JS 
**************************/
let storage = localStorage;
            var arrayDia = new Array(7);
            arrayDia = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
            var arrayMes = new Array(12);
            arrayMes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
            const data = new Date();
            var numero_item_pendente = 0;
            var numero_item_concluido = 0;
            var numero_total_item = 0;
            var percentagem_item_concluida = 0;
            var objData = {
                diaSemana: arrayDia[data.getDay()], diaMes: data.getDate(), mes: data.getMonth() + 1, ano: data.getFullYear()
            }
            
            var DomString = {
                diaSemana: '.dia_semana',
                dataCompleto: '.data_completo',
                num_item_pendente: '.num_item_pendente',
                container_pendente: '.container-item-pendente',
                container_item_pendente: '.container-item',
                container_item_pendente_text: '.container-item-text',
                container_item_pendente_remover: '.remover_text_pendente',
                container_concluido: '.container-item-concluido',
                percent_item_concluido: '.percent_item_concluido',
                container_item_concluido_text: '.container-item-concluido-text',
                container_item_concluido_remover: '.remover_text_concluido',
                container_item_message: '.container-item-message',
                container_footer: '.container-footer',
                btn_limpar_tudo: '.btn-clean-all',
                btn_esconder_item: '.btn-hide-item',
                btn_mostrar_item: '.btn-show-item',
                btn_add: '.btn-add',
                input_task: '.input-task',
                remover_text_pendente: '.remover_text_pendente',
                percentagem_item_concluido: '.percent_item_concluido'
            
            };
            
            var DomObj = {
                inputTask: document.querySelector(DomString.input_task),
                btnAdd: document.querySelector(DomString.btn_add),
                btnEsconderItem: document.querySelector(DomString.btn_esconder_item),
                btnMostrarItem: document.querySelector(DomString.btn_mostrar_item),
                container_item_pendente: document.querySelector(DomString.container_pendente),
                btn_remover_item_pendente: document.querySelector(DomString.remover_text_pendente),
                item_pendente: document.querySelector(DomString.num_item_pendente),
                item_concluido: document.querySelector(DomString.percent_item_concluido),
                container_item_pendente_text: document.querySelector(DomString.container_item_concluido_text),
                container_item_concluido: document.querySelector(DomString.container_concluido),
                container_footer: document.querySelector(DomString.container_footer)
            }
            
            function inputLength(){
                return DomObj.inputTask.value.length;
            }
            
            DomObj.btnAdd.addEventListener('click', function(){
                
                var html_item = '<div class="container-item"><div class="container-item-checkBox add-concluido"></div><h2 class="container-item-text">%task_item%</h2><div class="container-item-div remover_text_pendente"><i class="trash far fa-trash-alt"></i></div></div>';
                if(inputLength() > 0){
                    html_item = html_item.replace('%task_item%', DomObj.inputTask.value);
                    DomObj.container_item_pendente.insertAdjacentHTML('beforeend', html_item);
                    DomObj.inputTask.value = '';
                    numero_item_pendente++;
                    numero_total_item++;
                    console.log('Preenchido');
                    percentagem_item_concluida = percentagem_concluido(numero_total_item, numero_item_concluido);
                    render();
                }else{
                    alert('Impossível Adicionar Tarefa, não preencheu o campo!');
                    
                }
            });
            
            
            DomObj.container_item_pendente.addEventListener('click', function(e){
                const element = e.target;
                //const parent = element.parentNode.parentNode.parentNode;
                const parent = element.parentNode.parentNode;
                //console.log(element.className);
                console.log(parent.parentNode);
                // Para remover
                
                if(element.className == 'trash far fa-trash-alt')
                {
                    parent.parentNode.removeChild(element.parentNode.parentNode);
                    numero_item_pendente--;
                    numero_total_item--;
                    render();
                }
                
                if(element.className == 'container-item-checkBox add-concluido'){
                    
                    
                    element.parentNode.parentNode.removeChild(element.parentNode);
                    
                    var html = '<div class="container-item"><div class="container-item-concluido-checkBox remove-concluido"><i class="checked fas fa-check"></i></div><h2 class="container-item-concluido-text">%task_item%</h2><div class="container-item-div remover_text_concluido"><i class="trash far fa-trash-alt"></i></div></div>';

                    var task_item = element.nextSibling.textContent;
                    html = html.replace('%task_item%',task_item);
                    DomObj.container_item_concluido.insertAdjacentHTML('beforeend', html);
                   
                    numero_item_pendente--;
                    numero_item_concluido++;
                    percentagem_item_concluida = percentagem_concluido(numero_total_item, numero_item_concluido);
                    render();
                    
                }
                
            });   
            
            
            DomObj.container_item_concluido.addEventListener('click', function(e){
                const element = e.target;
                
                if(element.className == 'trash far fa-trash-alt'){
                    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
                    numero_total_item--;
                    numero_item_concluido--;
                    percentagem_item_concluida = percentagem_concluido(numero_total_item, numero_item_concluido);
                    render();
                }


                if(element.className == 'checked fas fa-check'){
                    
                    var task_item__ = element.parentNode.nextSibling.textContent;
                    var html = '<div class="container-item"><div class="container-item-checkBox add-concluido"></div><h2 class="container-item-text">%task_item%</h2><div class="container-item-div remover_text_pendente"><i class="trash far fa-trash-alt"></i></div></div>';
                    html = html.replace('%task_item%', task_item__);
                    DomObj.container_item_pendente.insertAdjacentHTML('beforeend', html);
                    
                    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
                    numero_item_concluido--;
                    numero_item_pendente++;
                    percentagem_item_concluida = percentagem_concluido(numero_total_item, numero_item_concluido);
                    render();
                    
                }
            });

            
            DomObj.container_footer.addEventListener('click', function(e){
                const element = e.target;
                if(element.className == 'btn-hide-item'){
                    var filhos = document.querySelector('.container-item-concluido');
                    console.log(filhos);
                    filhos.style.display = 'none';
                    element.style.display = 'none';
                    document.querySelector('.btn-show-item').style.display = 'block';
                }

                if(element.className == 'btn-show-item'){

                    var filhos = document.querySelector('.container-item-concluido');
                    filhos.style.display = 'block';
                    element.style.display = 'none';    
                    document.querySelector('.btn-hide-item').style.display = 'block';
                }

                if(element.className == 'btn-clean-all'){

                    var nodeContainerPendente = document.querySelector('.container-item-pendente');
                    var nodeContainerConcluido = document.querySelector('.container-item-concluido');
                    
                    while(nodeContainerPendente.lastChild.className != 'item-pendente-text'){
                        nodeContainerPendente.removeChild(nodeContainerPendente.lastChild);
                    }
                    while(nodeContainerConcluido.lastChild.className != 'item-concluido-text'){
                        nodeContainerConcluido.removeChild(nodeContainerConcluido.lastChild);
                    }

                    numero_item_concluido = 0;
                    numero_item_pendente = 0;
                    numero_total_item = 0;
                    percentagem_item_concluida = percentagem_concluido(numero_total_item, numero_item_concluido);
                    render();
                }

            });

            
            
            function percentagem_concluido(total_item, item_concluido){
                return (total_item > 0) ? (100*item_concluido)/total_item : 0;
            }
            
            
            function render(){
                setDate();
                DomObj.item_pendente.innerHTML = `${numero_item_pendente}`;
                DomObj.item_concluido.innerHTML =  `${percentagem_item_concluida}%`;
                if (numero_item_pendente == 0){
                    document.querySelector('.container-item-message').style.display = 'block';
                    document.querySelector('.container-item-pendente').style.display = 'none';
                }else{
                    document.querySelector('.container-item-message').style.display = 'none';
                    document.querySelector('.container-item-pendente').style.display = 'block';
                }
            }
            
            
            function setDate()
            {
                var length_dia_mes = Math.log(objData.diaMes) * Math.LOG10E + 1 | 0;
                var length_mes = Math.log(objData.diaMes) * Math.LOG10E + 1 | 0;
                var expressao_dia_mes = '';
                var expressao_mes = '';
                expressao_dia_mes = length_dia_mes < 2 ? '0'+objData.diaMes : objData.diaMes;
                expressao_mes = length_mes < 2 ? '0'+objData.mes : objData.mes;
                document.querySelector(DomString.diaSemana).textContent = objData.diaSemana;   
                document.querySelector(DomString.dataCompleto).textContent = `${expressao_dia_mes}-${expressao_mes}-${objData.ano}`;    
            }
            
            
            render();