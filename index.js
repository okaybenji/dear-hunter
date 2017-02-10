/* jshint esnext:true */
/* jshint browser:true */

const game = document.querySelector('main');
const lines = sections
  .map(section => section.lines)
  .reduce((acc, curr) => [...acc, ...curr])
  .reduce((acc, curr) => [...acc, ...curr]);

const createLink = (text, fn) => {
  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.innerHTML = text;
  link.onclick = fn;

  return link;
};

const createSpan = (text, classes = []) => {
  const span = document.createElement('span');
  span.innerHTML = text;
  classes.forEach(c => {
    span.classList.add(c);
  });

  return span;
};

const createNode = (sectionName, line) => {
  const node = document.createElement('div');
  node.classList.add('node');

  line.forEach(option => {
    node.appendChild(createLink(option.text, () => {
      const div = document.querySelector('.' + sectionName);
      div.appendChild(createSpan(option.text));
      game.removeChild(node);
      addNextNode();
    }));
  });

  return node;
};

const createSections = (sectionName) => {
  const divs = sections.map(s => {
    const div = document.createElement('div');
    div.classList.add(s.id);

    return div;
  });

  divs.forEach(div => {
    game.appendChild(div);
  });
};

const addNextNode = () => {
  const section = sections[0];

  if (!section) {
    return;
  }

  const line = section.lines.shift();

  const node = createNode(section.id, line);
  game.appendChild(node);

  if (!section.lines.length) {
    sections.shift();
  }
};

createSections();
addNextNode();

const receiveReply = () => {
  const spans = [...game.querySelectorAll('span')];

  spans.forEach(span => {
    span.innerHTML = lines.find(line => line.text === span.innerHTML).response;
  });

  // Delete the old signature line and overwrite the present greeting.
  const sig = game.querySelector('.signature');
  game.querySelector('.greeting').innerHTML = sig.innerHTML;
  game.removeChild(sig);
};
