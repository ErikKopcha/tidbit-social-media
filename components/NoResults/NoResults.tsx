interface IProps {
  text: string
}

const NoResults = ({  text  }: IProps): JSX.Element => {
  return (
    <>{text}</>
  )
}

export default NoResults;