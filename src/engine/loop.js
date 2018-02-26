/**
 * The game loop will automatically start when this file is imported
 */
let subscribers = [];
let lastRender = 0;

const update = timestamp => {
  const progress = timestamp - lastRender;

  subscribers.forEach(callback => {
    callback(progress);
  });

  lastRender = timestamp;
  if (!window.visible) {
    requestAnimationFrame(update);
  } else {
    setTimeout(() => update(window.performance.now()), 0);
  }
};
update(window.performance.now());

const subscribe = callback => {
  return subscribers.push(callback);
};

const unsubscribe = id => {
  delete subscribers[id - 1];
};

export { subscribe, unsubscribe };