import React from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'


const CardB = styled.div`
    margin: 10%;
    
    padding: 10%;
  backdrop-filter: blur(10px);
    

`

const BlurCard = () => (
    <Grid columns='equal' stackable>
        <Grid.Row>
            <Grid.Column>

                    <CardB>

                    </CardB>
            </Grid.Column>
            <Grid.Column>
                <CardB>

                    </CardB>
            </Grid.Column>
        </Grid.Row>

    </Grid>
        )

export default BlurCard
