#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
Bar <- function(category,data,names,type="bar",title,subtitle="",interval='auto', avg=T, extremum=T,horizontal=F,smooth=F,width = NULL, height = NULL) {
  # forward options using x
  data = as.data.frame(data)
  names(data) <- names
  x = list(
    category = category,
    data = data,
    type = type,
    interval = interval,
    title = title,
    subtitle = subtitle,
    avg = avg,
    extremum = extremum,
    horizontal=horizontal,
    smooth = smooth
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Bar',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
BarOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'Bar', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderBar <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, BarOutput, env, quoted = TRUE)
}
