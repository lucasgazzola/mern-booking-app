type SubmitButtonProps = {
  text: string
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-lg rounded-sm">
      {text}
    </button>
  )
}

export default SubmitButton
