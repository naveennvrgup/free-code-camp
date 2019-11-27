var w = 450, h = 450
var no_of_cells=15
var cw=w/no_of_cells,ch=h/no_of_cells

var game = d3.select('#snake-game')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

var cells = []
for (var i = 0; i < 15 * 15; i++) {
    cells.push(0)
}

game.selectAll('cell')
    .data(cells)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('width', cw-1)
    .attr('height', ch-1)
    .attr('x', (d, i) => {
        return (i % 15) * cw
    })
    .attr('y', (d, i) => {
        return Math.floor(i / 15) * ch
    })