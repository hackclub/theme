export default {
  '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
    color: 'muted'
  },
  '.comment': {
    fontStyle: 'italic'
  },
  '.property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable':
    {
      color: 'red'
    },
  '.atrule, .attr-value, .keyword': {
    color: 'blue'
  },
  '.selector, .attr-name, .string, .char, .builtin, .inserted': {
    color: 'orange'
  }
}
