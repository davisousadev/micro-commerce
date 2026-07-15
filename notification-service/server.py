import pika
import json
import sys
import time
import os

def processar_notificacao(ch, method, properties, body):
    try:
        pedido = json.loads(body.decode('utf-8'))
        
        print("\n🔔 [Notification Service] Nova mensagem recebida!")
        print(f"   ↳ Enviando e-mail de confirmação para o pedido: {pedido['id']}")
        print(f"   ↳ Detalhes: {pedido['quantidade']}x Produto ID {pedido['produtoId']}")
        print(f"   ↳ Valor Total: R$ {pedido['precoTotal']:.2f}")
        print("✉️ [E-mail] 'Seu pedido foi recebido e está sendo processado!'")
        
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")

def main():
    rabbit_host = os.environ.get('RABBIT_HOST', '127.0.0.1')
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbit_host))
    channel = connection.channel()
    channel.queue_declare(queue='fila_pedidos', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='fila_pedidos', on_message_callback=processar_notificacao)

    print('🚀 [Notification Service] Aguardando mensagens na fila_pedidos. Para sair use CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Serviço encerrado.')
        sys.exit(0)