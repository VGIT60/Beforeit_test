// No libraries needed: this file adds the portfolio's interactions.
'use strict';
document.body.classList.add('js-ready');
document.querySelector('#year').textContent = new Date().getFullYear();

const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
themeButton.hidden = false;
menuButton.hidden = false;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage is optional. */ }
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch { /* Theme still works without storage. */ }
});

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  navigation.classList.toggle('is-open', !expanded);
  menuButton.setAttribute('aria-expanded', String(!expanded));
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const dialog = document.querySelector('#project-dialog');
const demo = document.querySelector('#demo-content');
const projects = {
  focus: ['Focus — task planner', 'Add a task, check it off, and make a little progress.'],
  hue: ['Hue — palette studio', 'Generate a palette. Select a color to copy its hex value.'],
  split: ['Split — bill calculator', 'Set the bill, tip, and number of people to find everyone’s share.']
};
document.querySelectorAll('[data-project]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    document.querySelector('#dialog-title').textContent = projects[key][0];
    document.querySelector('#dialog-description').textContent = projects[key][1];
    demo.replaceChildren();
    if (key === 'focus') createTaskDemo();
    if (key === 'hue') createPaletteDemo();
    if (key === 'split') createCalculatorDemo();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});

function createTaskDemo() {
  demo.innerHTML = '<form id="task-form"><label class="field-label" for="task-input">New task</label><div class="task-entry"><input id="task-input" placeholder="What would you like to do?" maxlength="100" required><button class="button primary">Add task</button></div></form><ul class="demo-tasks"></ul><p class="demo-status" role="status"></p>';
  const list = demo.querySelector('ul');
  const status = demo.querySelector('[role="status"]');
  const update = () => {
    const total = list.children.length;
    const completed = list.querySelectorAll('input:checked').length;
    status.textContent = total ? `${completed} of ${total} tasks complete` : 'A fresh start. Add your first task.';
  };
  function addTask(text, done = false) {
    const row = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;
    checkbox.addEventListener('change', update);
    const name = document.createElement('span');
    name.textContent = text;
    label.append(checkbox, name);
    const remove = document.createElement('button');
    remove.className = 'remove-task';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Remove ${text}`);
    remove.addEventListener('click', () => { row.remove(); update(); demo.querySelector('#task-input').focus(); });
    row.append(label, remove);
    list.append(row);
    update();
  }
  addTask('Explore this portfolio', true);
  addTask('Make something of your own');
  demo.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const input = demo.querySelector('#task-input');
    const value = input.value.trim();
    if (!value) { input.setCustomValidity('Please enter a task.'); input.reportValidity(); return; }
    addTask(value);
    input.value = '';
    input.focus();
  });
  demo.querySelector('#task-input').addEventListener('input', event => event.target.setCustomValidity(''));
}

function createPaletteDemo() {
  demo.innerHTML = '<div class="palette-demo"></div><button class="button primary" id="generate">Generate palette</button><p class="demo-status" role="status"></p>';
  const palettes = [['#314638','#93AE84','#D7E5BF','#F4F4DC'],['#252850','#6C68B8','#B6B1E8','#EEEAFE'],['#183C49','#398B9D','#9FD7D9','#E6F5ED'],['#5B2434','#AB5263','#E9A5A0','#FBE2CB'],['#293F3B','#6C9A8B','#BFCE9E','#F4EAC8']];
  let index = 0;
  const status = demo.querySelector('[role="status"]');
  function render() {
    const strip = demo.querySelector('.palette-demo');
    strip.replaceChildren();
    palettes[index].forEach((color, position) => {
      const button = document.createElement('button');
      button.style.backgroundColor = color;
      button.style.color = position < 2 ? '#FFFFFF' : '#172016';
      button.textContent = color;
      button.setAttribute('aria-label', `Copy ${color}`);
      button.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(color); status.textContent = `${color} copied.`; }
        catch { status.textContent = `Copy this color manually: ${color}`; }
      });
      strip.append(button);
    });
  }
  demo.querySelector('#generate').addEventListener('click', () => {
    index = (index + 1 + Math.floor(Math.random() * (palettes.length - 1))) % palettes.length;
    render();
    status.textContent = 'New palette ready.';
  });
  render();
}

function createCalculatorDemo() {
  demo.innerHTML = '<form class="calc-fields"><label for="bill">Bill (₹)<input id="bill" type="number" min="0" max="1000000000" step="0.01" value="2000" required></label><label for="tip">Tip (%)<input id="tip" type="number" min="0" max="100" step="0.1" value="20" required></label><label for="people">People<input id="people" type="number" min="1" max="10000" step="1" value="4" required></label></form><output class="calc-result" aria-live="polite" for="bill tip people"></output>';
  const fields = [...demo.querySelectorAll('input')];
  const output = demo.querySelector('output');
  function calculate() {
    if (fields.some(field => !field.validity.valid)) {
      output.textContent = 'Enter a valid bill, a tip from 0–100%, and at least 1 person.';
      return;
    }
    const [bill, tip, people] = fields.map(field => Number(field.value));
    const amount = bill * (1 + tip / 100) / people;
    output.textContent = `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)} per person`;
  }
  demo.querySelector('form').addEventListener('submit', event => event.preventDefault());
  fields.forEach(field => field.addEventListener('input', calculate));
  calculate();
}
