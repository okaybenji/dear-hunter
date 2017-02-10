const game = document.querySelector('main');

const getAllSiblings = element => [...element.parentElement.children].filter(child => child !== element);

const createLink = (text, fn) => {
  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.innerHTML = text;
  link.onclick = () => {
    console.log(text);
    getAllSiblings(link).forEach(sibling => {
      link.parentElement.removeChild(sibling);
    });
    addNextNode();
  };

  return link;
};

const createNode = (sectionName, line) => {
  const node = document.createElement('div');
  node.classList.add('node');
  node.classList.add(sectionName);

  line.forEach(option => {
    node.appendChild(createLink(option.text));
    node.appendChild(document.createElement('br'));
  });

  return node;
};

const createNextNode = () => {
  const section = sections[0];

  if (!section) {
    return;
  }

  const line = section.lines.shift();

  if (!section.lines.length) {
    sections.shift();
  }

  return createNode(section.id, line);
};

const addNextNode = () => {
  game.appendChild(createNextNode());
};

addNextNode();
