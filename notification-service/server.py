import pika
import json
import sys
import time

def processar_notificacao(ch, method, properties, body):
    try:
        # Transforma a string JSON recebida de volta em um dicionário Python
        pedido = json.loads(body.decode('utf-8'))
        
        print("\n🔔 [Notification Service] Nova mensagem recebida!")
        print(f"   ↳ Enviando e-mail de confirmação para o pedido: {pedido['id']}")
        print(f"   ↳ Detalhes: {pedido['quantidade']}x Produto ID {pedido['produtoId']}")
        print(f"   ↳ Valor Total: R$ {pedido['precoTotal']:.2f}")
        print("✉️ [E-mail] 'Seu pedido foi recebido e está sendo processado!'")
        
        # Avisa o RabbitMQ que a mensagem foi processada com sucesso e pode ser deletada da fila
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")

def main():
    # Conecta ao RabbitMQ rodando no Docker
    # Se o localhost falhar por conta do IPv6, você pode usar '127.0.0.1'
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
    channel = connection.channel()

    # Cria a fila se ela não existir. O nome precisa ser IDENTICO ao que o Node.js vai usar
    channel.queue_declare(queue='fila_pedidos', durable=True)

    # Configura para o Python pegar apenas 1 mensagem por vez (evita sobrecarga)
    channel.basic_qos(prefetch_count=1)

    # Diz ao RabbitMQ qual função deve controlar as mensagens dessa fila
    channel.basic_consume(queue='fila_pedidos', on_message_callback=processar_notificacao)

    print('🚀 [Notification Service] Aguardando mensagens na fila_pedidos. Para sair use CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Serviço encerrado.')
        sys.exit(0)