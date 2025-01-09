self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function(event) {
  const notification = event.notification;
  
  // Check if this is a medication notification
  if (notification.data && notification.data.type === 'medication') {
    const { medicationName, time } = notification.data;
    
    // Send message to the main thread
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'MEDICATION_TAKEN',
          medicationName,
          time
        });
      });
    });
  }

  notification.close();
}); 