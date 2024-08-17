/* eslint-disable react/no-unstable-default-props */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { TooltipContentProps } from '@radix-ui/react-tooltip'

import { Toggle, Tooltip, TooltipContent, TooltipTrigger, icons } from '@/components'
import type { ButtonViewReturnComponentProps } from '@/types'
import { getShortcutKeys } from '@/utils/plateform'

interface IPropsActionButton {
  icon?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcutKeys?: string[]
  customClass?: string
  loading?: boolean
  tooltipOptions?: TooltipContentProps
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
  children?: React.ReactNode
  asChild?: boolean
  upload?: boolean
}

const ActionButton = React.forwardRef<HTMLButtonElement, Partial<IPropsActionButton>>(
  (props, ref) => {
    const {
      icon = undefined,
      // title = undefined,
      tooltip = undefined,
      disabled = false,
      customClass = '',
      // color = undefined,
      // loading = false,
      shortcutKeys = undefined,
      tooltipOptions = {},
      action = undefined,
      isActive = undefined,
      children,
      asChild = false,
      upload = false,
      ...rest
    } = props

    const Icon = icons[icon as string]
    const Comp = asChild ? Slot : Toggle

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            size="sm"
            className={`w-[32px] h-[32px] ${customClass}`}
            // pressed={isActive?.() || false}
            disabled={disabled}
            onClick={action}
            data-state={isActive?.() ? 'on' : 'off'}
            {...rest}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
          </Comp>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent {...tooltipOptions}>
            <div className="flex flex-col items-center text-center max-w-24">
              <div>{tooltip}</div>
              {!!shortcutKeys?.length && <span>{getShortcutKeys(shortcutKeys)}</span>}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    )
  },
)

export {
  ActionButton,
}
