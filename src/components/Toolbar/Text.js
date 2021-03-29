import { Component } from 'react'
import {
	AddWrapper,
	SettingsWrapper,
	FieldGroup,
	FieldCustomLabel
} from '../../styledComponents/Shapes.ui'
import { FieldInput,Button } from '../../styledComponents'
import Range from '../Range'
import Select from '../Shared/Select'

export default class Text extends Component {
	componentDidMount() {
		const { shapeOperations } = this.props

		shapeOperations.addText()
	}

	updateOpacity = (newVal) => this.props.shapeOperations.updateShape({ opacity: newVal })

	updateStroke = (property, value) => {
		const { shapeOperations, selectedShape: { stroke = {} } } = this.props
		shapeOperations.updateShape({ stroke: { ...stroke, [property]: value } })
	}

	updatePropertyFromEvent = (e) =>
  {
    this.props.shapeOperations.updateShape({ [e.target.name]: e.target.value })
  }

  updateProperty = (name, value)=>this.props.shapeOperations.updateShape({[name]: value})

		

	render() {
		const { t, selectedShape = {}, config: { theme } } = this.props
		const {
			text = '',
			textFont = 'Arial',
			textSize = 30,
			stroke = {},
			color = '#000000',
			opacity = 1,
      paddingTB=0,
      paddingLR=0,
      textTheme=0
		} = selectedShape

		return (
			<AddWrapper>
				<SettingsWrapper>
          {/* <FieldGroup>
            <Button onClick={()=>this.props.shapeOperations.addText()}>添加文字</Button> 
          </FieldGroup> */}
					<FieldGroup>
						<FieldCustomLabel>Text</FieldCustomLabel>
						<FieldInput
							id="text"
							value={text}
							name="text"
							style={{ minWidth: 111 }}
							onChange={this.updatePropertyFromEvent}
						/>
					</FieldGroup>
          <FieldGroup>
            <Range
						label={`字体大小:${textSize}`}
						min={0}
						max={63}
						step={3}
						range={textSize}
						updateRange={val=>this.updateProperty('textSize', val)}
						labelBefore={true}
					/>
           <Range
						label={'上下边距增幅'}
						min={0}
						max={1}
						step={0.05}
						range={paddingTB}
						updateRange={val=>this.updateProperty('paddingTB', val)}
						labelBefore={true}
					/>
          <Range
						label={'左右边距减幅'}
						min={0}
						max={1}
						step={0.05}
						range={paddingLR}
						updateRange={val=>this.updateProperty('paddingLR', val)}
						labelBefore={true}
					/>
          </FieldGroup>
					<FieldGroup>
						<FieldCustomLabel>Font family</FieldCustomLabel>
						<Select
							list={theme.fonts}
							valueProp="value"
							id="textFont"
							value={textFont}
							style={{ width: 111 }}
							onChange={(value) =>
								this.updatePropertyFromEvent({ target: { name: 'textFont', value } })}
							color="text-font"
							notRelativePosition
						/>
					</FieldGroup>
				</SettingsWrapper>
			</AddWrapper>
		)
	}
}
