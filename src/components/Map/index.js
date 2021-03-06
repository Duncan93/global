import React from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { connect } from 'react-redux';
// import Konva from 'konva';


class LocationNode extends React.Component {

  dimensions() {
    let scalar = this.props.utils.locationSize[this.props.vertex.value.size]["numGoodsDemanded"];
    return 10 * scalar;
  }

  render() {
    let dim = this.dimensions();
    return (
      <Circle
        x={this.props.vertex.x}
        y={this.props.vertex.y}
        width={dim}
        height={dim}
        fill={this.props.color}
      />
    );
  }
}

class Map extends React.Component {
  renderEdges() {
    return this.props.edges.map((e) => {
      const v1 = e[0], v2 = e[1];
      return <Line 
              key={`${v1.value.name} to ${v2.value.name} in ${e[2].weight}`}
              points={[v1.x, v1.y, v2.x, v2.y]}
              stroke="red"
              strokeWidth={2}
              />
    })
  }

  renderVertices() {
    return this.props.vertices.map((v) => {
      let color;
      if (v.value.type === "population-center") {
        color = "green";
      } else {
        color = "blue";
      }
      return <LocationNode key={v.value.name} vertex={v} color={color} utils={this.props.utils} />
    });
  }

  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer
  render() {
    return (
      <Stage className="map" width={this.props.utils.dimensions.width} height={this.props.utils.dimensions.height}> 
        <Layer>
          {this.renderEdges()}
          {this.renderVertices()}
        </Layer>
      </Stage>
    )
  }
}

function mapStateToProps(state) {
  return {
    utils: state.utils,
  }
}

export default connect(mapStateToProps)(Map);