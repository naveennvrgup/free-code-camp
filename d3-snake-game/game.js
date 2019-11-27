// game state
var game_width = 450, game_height = 450, no_of_cells = 15
var cell_width = game_width / no_of_cells
var cell_height = game_height / no_of_cells

var cell_color = {
    0: 'black',
    1: 'blue',
    2: 'red',
    3: 'yellow'
}

var cells_data = []
for (var i = 0; i < 15 * 15; i++) {
    cells_data.push(0)
}

// create the game plane
var game = d3.select('#snake-game')
    .append('svg')
    .attr('width', game_width)
    .attr('height', game_height)


// gameplay
var curr_direction = "right", next_direction = 'right'
var snake_body = [17], food_i
cells_data[snake_body[snake_body.length - 1]] = 3
for (var i = 0; i < snake_body.length - 1; i++)cells_data[snake_body[i]] = 1


game.selectAll('cell')
    .data(cells_data)
    .enter()
    .append('rect')
    .attr('width', cell_width)
    .attr('height', cell_height)
    .attr('x', (d, i) => (i % 15) * cell_width)
    .attr('y', (d, i) => Math.floor(i / 15) * cell_height)
    .attr('fill', (d, i) => cell_color[d])

var create_food = () => {
    var found = false

    while (!found) {
        found = true
        food_i = Math.floor(Math.random() * 156)
        for (var index in cells_data) {
            if (cells_data[index] == food_i) found = false
        }
    }

    game.select(`rect:nth-child(${food_i + 1})`)
        .attr('fill', cell_color[2])

}

create_food()
game_timer = setInterval(() => {
    var curr_head_i = snake_body[snake_body.length - 1]
    var next_head_x = 0, next_head_y = 0
    var curr_head_x = curr_head_i % no_of_cells, curr_head_y = Math.floor(curr_head_i / no_of_cells)

    switch (next_direction) {
        case 'left':
            next_head_x = (no_of_cells + curr_head_x - 1) % no_of_cells
            next_head_y = (no_of_cells + curr_head_y) % no_of_cells
            break
        case 'right':
            next_head_x = (no_of_cells + curr_head_x + 1) % no_of_cells
            next_head_y = (no_of_cells + curr_head_y) % no_of_cells
            break
        case 'up':
            next_head_x = (no_of_cells + curr_head_x) % no_of_cells
            next_head_y = (no_of_cells + curr_head_y - 1) % no_of_cells
            break
        case 'down':
            next_head_x = (no_of_cells + curr_head_x) % no_of_cells
            next_head_y = (no_of_cells + curr_head_y + 1) % no_of_cells
            break
    }

    var next_head_i = next_head_y * no_of_cells + next_head_x
    var prev_tail = snake_body[0]

    for (var index in snake_body) {
        if (next_head_i == snake_body[index]) {
            clearInterval(game_timer)
            alert('game over')
            return
        }
    }

    game.select(`rect:nth-child(${curr_head_i + 1})`)
        .attr('fill', cell_color[1])
    game.select(`rect:nth-child(${next_head_i + 1})`)
        .attr('fill', cell_color[3])

    // if food found then dont repaint the tail
    if (next_head_i !== food_i) {
        game.select(`rect:nth-child(${prev_tail + 1})`)
            .attr('fill', cell_color[0])
    }else{
        snake_body.unshift(curr_head_i)
        create_food()
    }

    // console.log({next_head_i,snake_body,next_head_x,next_head_y,curr_head_x,curr_head_y})

    snake_body.shift()
    snake_body.push(next_head_i)
    curr_direction = next_direction

}, 100)

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (curr_direction != 'down') { next_direction = 'up' }
            break
        case 'ArrowDown':
            if (curr_direction != 'up') { next_direction = 'down' }
            break
        case 'ArrowLeft':
            if (curr_direction != 'right') { next_direction = 'left' }
            break
        case 'ArrowRight':
            if (curr_direction != 'left') { next_direction = 'right' }
            break
    }
})