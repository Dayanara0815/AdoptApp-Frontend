import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

export const useWebSocket = (topic, onMessage) => {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8082/ws',  // ← WebSocket nativo (sin SockJS)
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(`✅ Conectado a WebSocket, suscrito a: ${topic}`);
        client.subscribe(topic, (message) => {
          try {
            const data = JSON.parse(message.body);
            console.log(`📨 Mensaje en ${topic}:`, data);
            onMessage(data);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
        setConnected(true);
      },
      onDisconnect: () => {
        console.log('❌ Desconectado de WebSocket');
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [topic]);

  return { connected };
};