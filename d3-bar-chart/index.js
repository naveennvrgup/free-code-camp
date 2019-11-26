var width = 800,
    height = 400,
    barwidth = width / 275;

// svg size
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 100)

var yearDigits = dataset.map((val) => {
    return val[0].substring(0, 4)
})

// scales
var mingdp = d3.min(dataset, d => d[1])
var maxgdp = d3.max(dataset, d => d[1])

var xscale = d3.scaleLinear()
    .domain([d3.min(yearDigits), d3.max(yearDigits)])
    .range([0, width])

var yscale = d3.scaleLinear()
    .domain([mingdp, maxgdp])
    .range([mingdp / maxgdp * height, height])

// axis
var xaxis = d3.axisBottom(xscale)
    .tickFormat(d3.format('d'))
svg.append('g')
    .call(xaxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(50,450)')

var yaxisscale = d3.scaleLinear()
    .domain([mingdp, maxgdp])
    .range([height, mingdp / maxgdp * height])
var yaxis = d3.axisLeft(yaxisscale)
svg.append('g')
    .call(yaxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(50,50)')

// tooltip
var tooltip = d3.select('#chart')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

// draw graph
d3.select('svg').selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('data-date', (d, i) => {
        return d[0]
    })
    .attr('data-gdp', (d, i) => {
        return d[1]
    })
    .attr('class', 'bar')
    .attr('x', (d, i) => {
        return i * barwidth
    })
    .attr('y', (d, i) => {
        return height - yscale(d[1])
    })
    .attr('width', barwidth)
    .attr('height', (d, i) => {
        return yscale(d[1])
    })
    .attr('transform', 'translate(50, 50)')
    .on('mouseover', function (d, i) {
        tooltip.html(`<h3>${d[0]}</h3><p>$${d[1]}</p>`)
            .style('opacity', .9)
            .style('left', i * barwidth + 'px')
            .style('top', height - 50 + 'px')
            .attr('data-date', d[0])
    })
    .on('mouseout', (d, i) => {
        tooltip.style('opacity', 0)
    })