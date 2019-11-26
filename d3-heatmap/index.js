// data
var temps = data.monthlyVariance
var base = data.baseTemperature

// svg dimensions 
var w = 1200,
    h = 400,
    px = 60,
    py = 35,
    span = temps[temps.length - 1].year - temps[0].year,
    rw = (w / span)

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', w + px * 2)
    .attr('height', h + py * 4)

// scale
var xscale = d3.scaleLinear()
    .domain([temps[0].year, temps[temps.length - 1].year])
    .range([0, w])

var yscale = d3.scalePoint()
    .domain([
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
    ])
    .range([0, h])
    .padding(0.5)

var threshold = d3.scaleThreshold()
    .domain([0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5])
    .range(['yellow', 'orange', 'pink', 'red', 'brown', 'lightgreen', 'green', 'skyblue', 'blue', 'violet', 'black'])

var legend = d3.scaleLinear()
    .domain([0, threshold.domain()[9]])
    .range([0, 500])

// axis
var xaxis = d3.axisBottom(xscale)
    .tickFormat(d => d)
    .tickSize(15)
    .tickSizeOuter(0)

var yaxis = d3.axisLeft(yscale)
    .tickSize(10)
    .tickSizeOuter(0)

var legendaxis = d3.axisBottom(legend)
    .tickSize(10)
    .tickSizeOuter(0)

// append axis to svg

svg.append('g')
    .call(xaxis)
    .attr('transform', `translate(${px},${h + py + 1})`)

svg.append('g')
    .call(yaxis)
    .attr('transform', `translate(${px - 1},${py})`)

svg.append('g')
    .call(legendaxis)
    .attr('transform', `translate(${px +w - 500},${h + py * 2 + 40})`)

// legend
svg.selectAll('rect')
    .data(threshold.domain())
    .enter()
    .append('rect')
    .attr('x', (d, i) => px + w - 500 + i * 50)
    .attr('y', h + py * 2 + 25)
    .attr('height', 15)
    .attr('width', 50)
    .attr('fill', (d, i) => threshold(d-0.1))

// tooltip
var tooltip = d3.select('#chart')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

// draw the graph
svg.selectAll('rect')
    .data(temps)
    .enter()
    .append('rect')
    .attr('width', rw)
    .attr('height', h / 12)
    .attr('x', (d, i) => px + (d.year - temps[0].year) * rw)
    .attr('y', (d, i) => py + (i % 12) * h / 12)
    .attr('fill', (d, i) => threshold(Math.abs(d.variance)))
    .on('mouseover', (d, i) => {
        tooltip.style('opacity', 0.9)
            .style('left', () => {
                if (px + 30 + (d.year - temps[0].year) * rw > window.innerWidth - 150) {
                    return px + 30 + (d.year - temps[0].year) * rw - 150 + 'px'
                }
                return px + 30 + (d.year - temps[0].year) * rw + 'px'
            })
            .style('top', py + (i % 12) * h / 12 + 'px')
            .html(`
            <p><strong>Year: </strong>${d.year}</p>
            <p><strong>Month: </strong>${d.month}</p>
            <p><strong>Temp: </strong>${(base - d.variance).toFixed(1)}&#8451;</p>
        `)
    })
    .on('mouseout', (d, i) => {
        tooltip.style('opacity', 0)
    })

console.log(temps);

// text

svg.append('text')
    .text('(color code for degree of varience in celsius)')
    .attr('stroke-width', 1)
    .attr('text-anchor', 'end')
    .attr('x', px + w - 510)
    .attr('y', py*3 + h)