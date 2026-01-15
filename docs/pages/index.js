import React from 'react'
import {
  BaseStyles,
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
import theme from '@doctordatadata/theme'
import ColorSwitcher from '../components/color-switcher'
import { TypeScale, ColorPalette } from '@theme-ui/style-guide'

const DocsPage = () => (
  <>
    <Head>
      <title>BioX Theme</title>
      <meta name="description" content="BioX theme + React components for Theme UI" />
      <meta property="og:title" content="BioX Theme" />
      <meta property="og:description" content="BioX theme + React components for Theme UI" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" />
    </Head>
    <Box as="header" sx={{ bg: 'sheet', color: 'text' }}>
      <Container sx={{ pt: 5, pb: [3, 4], textAlign: 'center' }}>
        <ColorSwitcher />
        <Heading as="h1" variant="title" color="red">
          BioX Theme
        </Heading>
        <Text as="p" variant="subtitle" mt={3}>
          BioX theme + React components for{' '}
          <Link href="https://theme-ui.com">Theme UI</Link>.
        </Text>
        <Grid
          gap={4}
          columns="auto auto auto"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 2,
            mt: 3,
            mb: 4,
            a: { color: 'muted', transition: 'color .125s ease-in-out' }
          }}
        >
          <NavLink href="https://github.com/dr-data/biox-theme">GitHub</NavLink>
          <NavLink href="https://npmjs.com/package/@doctordatadata/theme">
            NPM
          </NavLink>
          <NavLink href="https://github.com/dr-data/biox-theme">
            Docs
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
          key={key}
          variant={key}
          sx={{
            my: 3,
            py: 3,
            border: '2px dashed',
            borderColor: 'border',
            borderRadius: 'default'
          }}
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
        <Card>
          {Object.keys(theme.text).map(key => {
            const Component = key.includes('head') ? Heading : Text
            return (
              <Component key={key} variant={key} sx={{ mt: 0, mb: 3 }}>
                {key}
              </Component>
            )
          })}
        </Card>
        <Card as={BaseStyles} sx={{ mt: [3, 4], p: { fontSize: 2 } }}>
          <p>
            This is a whole paragraph of text, include{' '}
            <code>code like this</code>, as well as{' '}
            <a href="https://hackclub.com/">
              <code>linked code</code>
            </a>
            {' & '}
            <a href="https://hackclub.com/">regular links</a>. The paragraph
            ended up being 1 sentence, but now I guess it's <strong>two</strong>
            .
          </p>
          <pre>
            <code>Here's a code block! No highlighting to be found.</code>
          </pre>
        </Card>
        <Heading variant="headline">Fonts & References</Heading>
        <Grid gap={3} columns={[null, 3]}>
          <Card>
            <Heading as="h3" variant="headline" my={0} sx={{ fontSize: 2 }}>
              English
            </Heading>
            <Text as="p" sx={{ mt: 2, mb: 1, fontSize: 1 }}>
              Phantom Sans (Custom)
            </Text>
            <Text as="p" sx={{ mt: 0, fontSize: 0, color: 'muted' }}>
              System fallbacks: Segoe UI, Roboto
            </Text>
          </Card>
          <Card>
            <Heading as="h3" variant="headline" my={0} sx={{ fontSize: 2 }}>
              Traditional Chinese
            </Heading>
            <Text as="p" sx={{ mt: 2, mb: 1, fontSize: 1 }}>
              <Link href="https://fonts.google.com/noto/specimen/Noto+Sans+TC" target="_blank">
                Noto Sans TC
              </Link>
            </Text>
            <Text as="p" sx={{ mt: 0, fontSize: 0, color: 'muted' }}>
              Regular 400 & Bold 700
            </Text>
          </Card>
          <Card>
            <Heading as="h3" variant="headline" my={0} sx={{ fontSize: 2 }}>
              Simplified Chinese
            </Heading>
            <Text as="p" sx={{ mt: 2, mb: 1, fontSize: 1 }}>
              <Link href="https://fonts.google.com/noto/specimen/Noto+Sans+SC" target="_blank">
                Noto Sans SC
              </Link>
            </Text>
            <Text as="p" sx={{ mt: 0, fontSize: 0, color: 'muted' }}>
              Regular 400 & Bold 700
            </Text>
          </Card>
        </Grid>
        <Heading variant="headline" sx={{ mt: 5 }}>Chinese Fonts</Heading>
        <Grid gap={3} columns={[null, 2]} sx={{ code: { mt: 1, ml: -1, fontSize: 0 } }}>
          <Card sx={{ fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            <Heading as="h3" variant="headline" my={0}>
              Traditional Chinese (繁體中文)
            </Heading>
            <Text as="p" sx={{ mt: 3, mb: 2, fontSize: 3 }}>
              BioX 主題
            </Text>
            <Text as="p" sx={{ mt: 0, mb: 2, fontSize: 2 }}>
              歡迎使用我們的設計系統。這是一個基於 Theme UI 的現代化前端設計工具。
            </Text>
            <Text as="code" variant="styles.code">
              Noto Sans TC (Regular 400 & Bold 700)
            </Text>
          </Card>
          <Card sx={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            <Heading as="h3" variant="headline" my={0}>
              Simplified Chinese (简体中文)
            </Heading>
            <Text as="p" sx={{ mt: 3, mb: 2, fontSize: 3 }}>
              BioX 主题
            </Text>
            <Text as="p" sx={{ mt: 0, mb: 2, fontSize: 2 }}>
              欢迎使用我们的设计系统。这是一个基于 Theme UI 的现代化前端设计工具。
            </Text>
            <Text as="code" variant="styles.code">
              Noto Sans SC (Regular 400 & Bold 700)
            </Text>
          </Card>
        </Grid>
        <Heading variant="headline">Buttons</Heading>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>English</Heading>
          <Box sx={{ mb: 3 }}>
            {Object.keys(theme.buttons).map(key => (
              <Button key={key} variant={key} sx={{ mr: 3, mb: 3 }}>
                {key} btn
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            Traditional Chinese (繁體中文)
          </Heading>
          <Box sx={{ mb: 3, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            {Object.keys(theme.buttons).map(key => (
              <Button key={`tc-${key}`} variant={key} sx={{ mr: 3, mb: 3 }}>
                按鈕
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            Simplified Chinese (简体中文)
          </Heading>
          <Box sx={{ mb: 3, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            {Object.keys(theme.buttons).map(key => (
              <Button key={`sc-${key}`} variant={key} sx={{ mr: 3, mb: 3 }}>
                按钮
              </Button>
            ))}
          </Box>
        </Box>
        <Heading variant="headline">Cards</Heading>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>English</Heading>
          <Grid
            columns={[null, 2, 3]}
            gap={3}
            sx={{ code: { mt: 1, ml: -1, fontSize: 0 } }}
          >
            {Object.keys(theme.cards).map(key => (
              <Card variant={key} key={key} p={[3, 4]}>
                {key}
              </Card>
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
        </Box>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            Traditional Chinese (繁體中文)
          </Heading>
          <Grid columns={[null, 2, 3]} gap={3} sx={{ fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            {Object.keys(theme.cards).map(key => (
              <Card variant={key} key={`tc-${key}`} p={[3, 4]}>
                {key === 'default' ? '預設' : key === 'primary' ? '主要' : '次要'}
              </Card>
            ))}
            <Card
              sx={{
                backgroundImage: t => t.util.gx('cyan', 'blue'),
                color: 'white'
              }}
            >
              <Text sx={{ fontSize: 2 }}>漸變背景</Text>
            </Card>
            <Card>
              <Text sx={{ fontSize: 2, background: t => t.util.gxText('cyan', 'blue'), WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>漸變文字</Text>
            </Card>
          </Grid>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            Simplified Chinese (简体中文)
          </Heading>
          <Grid columns={[null, 2, 3]} gap={3} sx={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            {Object.keys(theme.cards).map(key => (
              <Card variant={key} key={`sc-${key}`} p={[3, 4]}>
                {key === 'default' ? '默认' : key === 'primary' ? '主要' : '次要'}
              </Card>
            ))}
            <Card
              sx={{
                backgroundImage: t => t.util.gx('cyan', 'blue'),
                color: 'white'
              }}
            >
              <Text sx={{ fontSize: 2 }}>渐变背景</Text>
            </Card>
            <Card>
              <Text sx={{ fontSize: 2, background: t => t.util.gxText('cyan', 'blue'), WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>渐变文字</Text>
            </Card>
          </Grid>
        </Box>
        <Heading variant="headline">Forms</Heading>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>English</Heading>
          <Grid gap={3} columns={[null, 2]} as="form" variant="cards.sunken">
            <Label>
              Full name
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
            <Flex sx={{ flexWrap: 'wrap' }}>
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
              sx={{ gridColumn: [null, 'span 2'] }}
            />
          </Grid>
        </Box>
        <Box sx={{ mb: 4, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            Traditional Chinese (繁體中文)
          </Heading>
          <Grid gap={3} columns={[null, 2]} as="form" variant="cards.sunken">
            <Label>
              全名
              <Input placeholder="您的姓名" />
            </Label>
            <Label>
              您與本組織的關係
              <Select>
                <option value="" disabled hidden>
                  選擇一個…
                </option>
                <option value="member">成員</option>
                <option value="leader">領導者</option>
                <option value="partner">合作夥伴</option>
              </Select>
            </Label>
            <Label variant="labelHoriz">
              <Checkbox />
              記住我
            </Label>
            <Label>
              留言
              <Textarea placeholder="請輸入您的消息" />
            </Label>
            <Button
              as="button"
              type="submit"
              children="提交"
              sx={{ gridColumn: [null, 'span 2'] }}
            />
          </Grid>
        </Box>
        <Box sx={{ mb: 4, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            Simplified Chinese (简体中文)
          </Heading>
          <Grid gap={3} columns={[null, 2]} as="form" variant="cards.sunken">
            <Label>
              全名
              <Input placeholder="您的姓名" />
            </Label>
            <Label>
              您与本组织的关系
              <Select>
                <option value="" disabled hidden>
                  选择一个…
                </option>
                <option value="member">成员</option>
                <option value="leader">领导者</option>
                <option value="partner">合作伙伴</option>
              </Select>
            </Label>
            <Label variant="labelHoriz">
              <Checkbox />
              记住我
            </Label>
            <Label>
              留言
              <Textarea placeholder="请输入您的消息" />
            </Label>
            <Button
              as="button"
              type="submit"
              children="提交"
              sx={{ gridColumn: [null, 'span 2'] }}
            />
          </Grid>
        </Box>
        <Heading variant="headline">Badges</Heading>
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>English</Heading>
          <Box sx={{ mb: 3 }}>
            {Object.keys(theme.badges).map(key => (
              <Badge
                key={key}
                variant={key}
                mr={3}
                color={key === 'outline' ? 'muted' : null}
              >
                {key}
              </Badge>
            ))}
          </Box>
        </Box>
        <Box sx={{ mb: 4, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}>
            Traditional Chinese (繁體中文)
          </Heading>
          <Box sx={{ mb: 3 }}>
            {Object.keys(theme.badges).map(key => (
              <Badge
                key={`tc-${key}`}
                variant={key}
                mr={3}
                color={key === 'outline' ? 'muted' : null}
                sx={{ fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}
              >
                {key === 'primary' ? '主要' : key === 'secondary' ? '次要' : key === 'accent' ? '強調' : '標籤'}
              </Badge>
            ))}
          </Box>
        </Box>
        <Box sx={{ mb: 4, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>
            Simplified Chinese (简体中文)
          </Heading>
          <Box sx={{ mb: 3 }}>
            {Object.keys(theme.badges).map(key => (
              <Badge
                key={`sc-${key}`}
                variant={key}
                mr={3}
                color={key === 'outline' ? 'muted' : null}
                sx={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}
              >
                {key === 'primary' ? '主要' : key === 'secondary' ? '次要' : key === 'accent' ? '强调' : '标签'}
              </Badge>
            ))}
          </Box>
        </Box>
        <Heading variant="headline">Colors</Heading>
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

export default DocsPage
