import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Label,
  Link,
  NavLink,
  Radio,
  Select,
  Slider,
  Text,
  Textarea
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import theme from '@hackclub/theme'
import ColorSwitcher from '../components/color-switcher'
import { TypeScale, ColorPalette } from '@theme-ui/style-guide'

export default () => (
  <>
    <Head>
      <title>Hack Club Theme</title>
      <Meta
        name="Theme"
        description="Hack Club’s theme + React components for Theme UI"
      />
    </Head>
    <Box as="header" sx={{ bg: 'sheet', color: 'text' }}>
      <Container sx={{ pt: [4, 5], pb: [3, 4], textAlign: 'center' }}>
        <ColorSwitcher />
        <Heading as="h1" variant="title" color="red">
          Hack Club Theme
        </Heading>
        <Text as="p" variant="subtitle" mt={3}>
          <Link href="https://hackclub.com/">Hack Club’s</Link> theme + React
          components for <Link href="https://theme-ui.com">Theme UI</Link>.
        </Text>
        <Grid
          gap={4}
          columns="auto auto"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 2,
            mt: 3,
            mb: 4,
            a: { color: 'muted', transition: 'color .125s ease-in-out' }
          }}
        >
          <NavLink href="https://github.com/hackclub/theme">GitHub</NavLink>
          <NavLink href="https://npmjs.com/package/@hackclub/theme">
            npm
          </NavLink>
        </Grid>
      </Container>
    </Box>
    <Box as="section" sx={{ bg: 'background', py: 4 }}>
      <Container>
        <Heading variant="headline">Containers</Heading>
      </Container>
      {Object.keys(theme.layout).map(key => (
        <Container
          variant={key}
          sx={{ my: 3, py: 3, bg: 'sunken', borderRadius: 'default' }}
        >
          {key}
        </Container>
      ))}
    </Box>
    <Box
      as="main"
      sx={{ bg: 'background', color: 'text', py: 4, h2: { mt: 4 } }}
    >
      <Container>
        <Heading variant="headline">Text</Heading>
        <Card sx={{ columnCount: [null, 2] }}>
          {Object.keys(theme.text).map(key => {
            const Component = key.includes('head') ? Heading : Text
            return (
              <Component key={key} variant={key} sx={{ mt: 0, mb: 3 }}>
                {key}
              </Component>
            )
          })}
        </Card>
        <Heading variant="headline">Buttons</Heading>
        {Object.keys(theme.buttons).map(key => (
          <Button variant={key} sx={{ mr: 3 }}>
            {key} button
          </Button>
        ))}
        <Heading variant="headline">Cards</Heading>
        <Grid
          columns={[2, 3]}
          gap={3}
          sx={{ code: { mt: 1, ml: -1, fontSize: 0 } }}
        >
          {Object.keys(theme.cards).map(key => (
            <Card variant={key}>{key}</Card>
          ))}
          <Card
            sx={{
              backgroundImage: t => t.util.gx('cyan', 'blue'),
              color: 'white'
            }}
          >
            <Heading variant="headline" as="h3" my={0}>
              Gradient BG
            </Heading>
            <Text as="code" variant="styles.code">
              theme.util.gx('color1', 'color2')
            </Text>
          </Card>
          <Card>
            <Heading
              variant="headline"
              as="h3"
              sx={t => t.util.gxText('cyan', 'blue')}
              my={0}
            >
              Gradient text
            </Heading>
            <Text as="code" variant="styles.code">
              theme.util.gxText('color1', 'color2')
            </Text>
          </Card>
        </Grid>
        <Heading variant="headline">Forms</Heading>
        <Grid gap={3} columns={[null, 2]} as="form" variant="cards.sunken">
          <Label>
            Full Name
            <Input placeholder="Zach Latta" />
          </Label>
          <Label>
            How are you primarily associated with Hack Club?
            <Select>
              <option value="" disabled hidden>
                Select one…
              </option>
              <option value="club-leader">I lead a club</option>
              <option value="club-member">I am a club member</option>
              <option value="slack-member">I am active on Slack</option>
              <option value="alum">I am a Hack Club alum</option>
              <option value="none">None of the above</option>
            </Select>
          </Label>
          <Label variant="labelHoriz">
            <Checkbox />
            Remember me
          </Label>
          <Flex>
            <Label variant="labelHoriz">
              <Radio name="letter" /> Alpha
            </Label>
            <Label variant="labelHoriz">
              <Radio name="letter" /> Bravo
            </Label>
            <Label variant="labelHoriz">
              <Radio name="letter" /> Charlie
            </Label>
          </Flex>
          <Label>
            Why do you want to come?
            <Textarea placeholder="Write a few sentences." />
          </Label>
          <Label>
            Slider
            <Slider color="red" />
          </Label>
          <Button
            as="button"
            type="submit"
            children="RSVP"
            sx={{ gridColumn: 'span 2' }}
          />
        </Grid>
        <Heading variant="headline">Badges</Heading>
        {Object.keys(theme.badges).map(key => (
          <Badge
            variant={key}
            mr={3}
            color={key === 'outline' ? 'muted' : null}
          >
            {key}
          </Badge>
        ))}
        <ColorPalette
          omit={['modes', 'placeholder', 'twitter', 'instagram', 'facebook']}
        />
        <TypeScale />
        <Text as="pre" variant="styles.pre">
          {JSON.stringify(theme, null, 2)}
        </Text>
      </Container>
    </Box>
  </>
)
