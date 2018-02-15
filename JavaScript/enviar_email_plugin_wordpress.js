<script language="javascript">
    jQuery(document).ready(function ($) {
        $('.after-calculate').hide();
        
        // Envia os dados para o email de vendas
        $('form').on('click', '.calcular-total-portao, .orcamento-portao', function (event) { //ao cliclar no botão de orçamento
            let dados = capturarDados();
            if(dados){
                $.post( //envia email com dados preenchidos
                    'http://columbiaseg.com.br/wp-content/themes/lambda/ajax/valor-orcamento.php', //requisiçao ajax para enviar email para o administrador
                    dados
                );
                $('.after-calculate').show(); //mostra dados escondidos
            }
        });
        // Solicita instalação e envia email para suporte
        $('form').on('click', '#fld_9705433_6', function(event){
            let dados = capturarDados();
            if(dados){
                $.post( //envia email com dados preenchidos
                    'http://columbiaseg.com.br/wp-content/themes/lambda/ajax/enviar-email-all.php', //requisiçao ajax para enviar email para o cliente
                    dados
                );
            }
        });
    });

    function capturarDados(){
        // Captura os dados
        let name = $('.nomePortao').find('input').val(); 
        let email = $('.emailPortao').find('input').val();
        let phone = $('.phonePortao').find('input').val();
        let city = $('.cityPortao').find('select option:selected').text();
		let form = $(this).closest('form');

        if (name && email && phone && city) { //verifica se foram preenchidos campos básicos
            let valor_orcamento = $('#fld_5905880_6').html();
            if (valor_orcamento == '0.00') {  //verifica se foi selecionado pelo menos algum produto
                alert('Selecione pelo menos um item para orçar.');
                return false;
            } 
            else {
                items = [];
                let valores = new Array();
                let cont = 0;
                $('select option:selected').each(function (key, value) { //captura todos os valores não nulos 
                    valorItem = $(this).val();
                    if (valorItem > 0) {
                        valores.push(valorItem);
                    }
                });
                $('input[type=checkbox]:checked').each(function (key, value) { //capura todos quantidade dos valores
                    if (valores[cont] != 0)
                        items[key] = valores[cont] + " " + $(this).parent().text();
                    cont++;
                });
                return {
                    name: name, 
                    email: email, 
                    phone: phone, 
                    city: city, 
                    total: valor_orcamento, 
                    orcamento: 'Portão Eletrônico', 
                    items: items
                };
            }
        } 
        else { //caso não tiver preenchidos campos básicos
            alert('Preencha todos os campos requeridos.');
            return false;
        }
    }
</script>