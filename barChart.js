export const barChart = (selection, props) => {
    const {
        xValue,
        yValue,
        margin,
        width,
        height,
        data
    } = props;

    const newData = data.slice(1,13);
    //console.log(newData);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(newData, xValue)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(newData.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);
        //console.log(yScale.domain());

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g
        .enter().append('g')
            .attr('class', 'container');
    gEnter
        .merge(g)
            .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('.3s'))
        .tickSize(-innerHeight);

    const yAxis = d3.axisLeft(yScale);

    //const yAxisG = gEnter
    gEnter
        .append('g')
            .attr('class', 'y-axis')
        .merge(g.select('.y-axis'))
            .call(yAxis)
            .selectAll('.domain, .tick line')
            .remove();

    gEnter
        .append('g')
            .attr('class', 'x-axis')
        .merge(g.select('.x-axis'))
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis)
            .selectAll('.domain')
            .remove();

    const rects = g.merge(gEnter).selectAll('rect').data(newData);
    rects.enter().append('rect')
        .merge(rects)
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());


    g.enter()
        .append('g')
            .attr('transform', `translate(600,${height-5})`)
            .attr('class', 'source')
            .append('text')
                .text('Source: World Health Organization')
                .on('click', function(){
                    window.open('https://covid19.who.int/table');
                });
};