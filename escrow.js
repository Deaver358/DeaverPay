function holdPayment(taskIndex){
  const task = tasks[taskIndex];
  showNotification(`$${task.pay} is held in escrow for "${task.title}"`,"info");
}

function releasePayment(taskIndex){
  const task = tasks[taskIndex];
  showNotification(`$${task.pay} released to worker for "${task.title}"`,"success");
}