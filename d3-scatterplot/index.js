console.log(JSON.stringify(data, null, 2));

var w = 800,
    h = 400,
    p = 70

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', w + p * 2)
    .attr('height', h + p * 2)

// axis
var yearMin = d3.min(data, d => +d.Year),
    yearMax = d3.max(data, d => +d.Year),
    timeMin = d3.min(data, d => +d.Seconds),
    timeMax = d3.max(data, d => +d.Seconds)

var xscale = d3.scaleLinear()
    .domain([yearMin - 1, yearMax + 1])
    .range([0, w])

var yscale = d3.scaleLinear()
    .domain([timeMin - 10, timeMax + 10])
    .range([0, h])

var yaxisscale = d3.scaleLinear()
    .domain([timeMin - 10, timeMax + 10])
    .range([h, 0])

// scale
var xaxis = d3.axisBottom(xscale)
svg.append('g')
    .call(xaxis)
    .attr('id', 'x-axis')
    .attr('transform', `translate(${p}, ${h + p})`)

var yaxis = d3.axisLeft(yaxisscale)
svg.append('g')
    .call(yaxis)
    .attr('id', 'y-axis')
    .attr('transform', `translate(${p}, ${p})`)

// tooltip
var tooltip = d3.select('#chart')
    .append('div')
    .attr('id', 'tooltip')
    .attr('opacity', '1')

// draw the chart
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('data-xvalue', d => xscale(d.Year) + p)
    .attr('data-yvalue', d => yscale(d.Seconds) + p)
    .attr('r', 6)
    .attr('cx', d => xscale(d.Year) + p)
    .attr('cy', d => yscale(d.Seconds) + p)
    .attr('fill', d => d.Doping ? 'orange' : 'green')
    .attr('stroke', 'black')
    // on hover
    .on('mouseover', function (d, i) {
        tooltip.html(`
            <h3>${d.Name}</h3>
            <p><strong>Time:</strong> ${+d.Time.slice(0, 2) - 30}:${+d.Time.slice(3, 5)}</p>
            <p><strong>Year:</strong> ${d.Year}</p>
            <p><strong>Doping:</strong> ${d.Doping.length > 0 ? d.Doping : 'N/A'}</p>
        `)
            .style('opacity', 1)
            .style('background', d.Doping ? '#ddd' : 'skyblue')
            .style('top', yscale(d.Seconds) + p + 'px')
            .style('left', function () {
                if (xscale(d.Year) < 500) {
                    return xscale(d.Year) + p + 20 + 'px'
                } else {
                    return xscale(d.Year) + p + 20 - 280 + 'px'
                }
            })
    })
    .on('mouseout', function (d, i) {
        tooltip.style('opacity', 0)
    })

// append title
svg.append('text')
    .text('Time in Seconds')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(90)')
    .attr('x', (h + p * 2) / 2)
    .attr('y', -10)
    .style('font-weight', 'bold')

svg.append('text')
    .text('Years')
    .attr('text-anchor', 'middle')
    .attr('x', (w + p * 2) / 2)
    .attr('y', h + p + 40)
    .style('font-weight', 'bold')

svg.append('text')
    .text('Doping in Professional Bicycle Racing')
    .attr('text-anchor', 'middle')
    .attr('x', (w + p * 2) / 2)
    .attr('y', 50)
    .style('font-size', '30px')

svg.append('text')
    .text("35 Fastest times up Alpe d'Huez")
    .attr('text-anchor', 'middle')
    .attr('x', (w + p * 2) / 2)
    .attr('y', 90)

svg.append('text')
    .text("Involved in Doping")
    .attr('text-anchor', 'left')
    .attr('x', (w + p * 2) / 4 * 3)
    .attr('y', 200)

svg.append('text')
    .text("Doping free")
    .attr('text-anchor', 'left')
    .attr('x', (w + p * 2) / 4 * 3)
    .attr('y', 230)

// squares

svg.append('rect')
    .attr('width', '20')
    .attr('height', '20')
    .attr('x', (w + p * 2) / 4 * 3 - 30)
    .attr('y', 185)
    .attr('fill', 'orange')

svg.append('rect')
    .attr('width', '20')
    .attr('height', '20')
    .attr('x', (w + p * 2) / 4 * 3 - 30)
    .attr('y', 215)
    .attr('fill', 'green')