import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AlertTriangle } from '@untitled-ui/icons-react'

export default function DeleteShippingAddress({openDelete, setOpenDelete}){
  return (
    <Transition.Root show={openDelete} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setOpenDelete}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full max-w-md">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EC5454]">
                    <AlertTriangle color="white"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                      คุณต้องการ 'ลบ'<br/>ที่อยู่การจัดส่ง ใช่หรือไม่
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xs text-[#8A8A8A]">
                        หากคุณกดยืนยันในการลบ<br/>ข้อมูลที่อยู่ของคุณจะถูกลบออกไป
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <button
                    type="button"
                    className='w-full bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 text-center'
                    onClick={() => setOpenDelete(false)}
                  >
                    ยกเลิกการลบ
                  </button>
                  <button
                    type="button"
                    className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                  >
                    ยืนยันการลบ
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}